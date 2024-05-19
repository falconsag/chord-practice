package org.falconsag.chordpractice.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.falconsag.chordpractice.backend.model.AbstractChordQualities;
import org.falconsag.chordpractice.backend.model.Chord;
import org.falconsag.chordpractice.backend.model.ChordData;
import org.falconsag.chordpractice.backend.model.ChordQualities;
import org.falconsag.chordpractice.backend.model.ChordRequest;
import org.springframework.stereotype.Component;

@Component
public class ChordPracticeService {

	private static final String KEY_REGEX = "[CDEFGAB][#b]?";
	private final Random rand = new Random();
	private final ChordData chordData;
	private final List<String> chordSuffixes;
	private final Pattern notationPattern;

	//format is Key + Quality + (:<voicing_no> or _<fingering> examples
	// Em7, Cadd9, Dmajor:1, G7_3,2
	private static final List<String> PERSONAL_CHORDS = List.of("G7:2");

	public ChordPracticeService(ObjectMapper om) throws IOException {
		try (InputStream is = getClass().getResourceAsStream("/chords.json")) {
			chordData = om.readValue(is, ChordData.class);
		}
		chordSuffixes = new ArrayList<>(chordData.getSuffixes());
		chordSuffixes.sort((s1, s2) -> s2.length() - s1.length());
		notationPattern = buildChordNotationPattern();
	}

	public Chord getPersonalChordPractice() {
		String notation = getRandomElement(PERSONAL_CHORDS);
		Matcher matcher = notationPattern.matcher(notation);
		if (matcher.find()) {
			String key = matcher.group(1);
			String quality = matcher.group(2);
			if (key == null || quality == null) {
				throw new ChordPracticeException("Notation format %s is incorrect. Please use the format <key><quality>[:<voicing>]".formatted(notation));
			}

			List<ChordQualities> chordQualities = getChordQualities(key);
			Optional<ChordQualities> voicingsOpt = chordQualities.stream().filter(cq -> cq.getSuffix().equals(quality)).findFirst();
			List<Chord> chordVoicings = voicingsOpt.orElseThrow(() -> new ChordPracticeException("No chord found for key %s and quality %s".formatted(key, quality))).getPositions();

			String voicingSearch = matcher.group(3);
			if (voicingSearch == null) {
				return chordVoicings.get(0);
			} else if (voicingSearch.startsWith(":")) {
				return chordVoicings.get(Integer.parseInt(voicingSearch.substring(1)) - 1);
			} else if (voicingSearch.startsWith("_")) {
				List<String> fingeringSearch = Arrays.stream(voicingSearch.substring(1).split(",")).toList();
				List<Chord> foundFingerings = chordVoicings.stream().filter(c -> isPrefixInList(c.getFingers(), fingeringSearch)).toList();
				if (foundFingerings.isEmpty()) {
					throw new ChordPracticeException("No chord found for key %s and quality %s with fingering search %s".formatted(key, quality, voicingSearch));
				} else {
					return getRandomElement(foundFingerings);
				}
			} else {
				throw new ChordPracticeException("Notation format %s is incorrect. Please use the format <key><quality>[:<voicing>]".formatted(notation));
			}
		} else {
			throw new ChordPracticeException("Notation format %s is incorrect. Please use the format <key><quality>[:<voicing>]".formatted(notation));
		}
	}

	private <T> T getRandomElement(List<T> list) {
		return list.get(rand.nextInt(list.size()));
	}

	private List<ChordQualities> getChordQualities(String key) {
		List<ChordQualities> chordQualities = chordData.getChords().get(key);
		if (chordQualities == null || chordQualities.isEmpty()) {
			throw new ChordPracticeException("No chords found for key %s".formatted(key));
		}
		return chordQualities;
	}


	private static boolean isPrefixInList(List<String> data, List<String> search) {
		if (search.isEmpty()) {
			return true;
		}

		if (search.size() > data.size()) {
			return false;
		}

		for (int i = 0; i < search.size(); i++) {
			if (!data.get(i).equals(search.get(i))) {
				return false;
			}
		}

		return true;
	}

	public Chord getRandomChord(ChordRequest request) {
		Map<String, List<ChordQualities>> chordsMap = chordData.getChords();
		String randomKey = getRandomKey(request);
		String randomSuffix = getRandomSuffix(request);
		List<ChordQualities> chords = chordsMap.get(randomKey);
		Map<String, ChordQualities> chordsByKey = chords.stream().collect(Collectors.toMap(AbstractChordQualities::getSuffix, Function.identity()));
		ChordQualities selectedVariations = chordsByKey.get(randomSuffix);
		List<Chord> ch = selectedVariations.getPositions();
		int idx = rand.nextInt(ch.size());
		Chord selectedChord = ch.get(idx);
		return selectedChord.withName(selectedVariations.getKey() + selectedVariations.getSuffix());
	}

	private String getRandomSuffix(ChordRequest request) {
		Set<String> requestedSuffixes = request.getSuffixes();
		return requestedSuffixes.stream().skip(rand.nextInt(requestedSuffixes.size())).findFirst().get();
	}

	private String getRandomKey(ChordRequest request) {
		Set<String> requestedKeys = request.getKeys();
		return requestedKeys.stream().skip(rand.nextInt(requestedKeys.size())).findFirst().get();
	}

	private Pattern buildChordNotationPattern() {
		String suffixRegex = String.join("|", chordSuffixes);
		String patternString = String.format("(%s)(%s)%s", KEY_REGEX, suffixRegex, "(_([0-9]+(,[0-9]+){0,5})|:(\\d+))?");
		return Pattern.compile(patternString);
	}
}
