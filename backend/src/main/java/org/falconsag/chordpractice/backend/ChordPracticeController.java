package org.falconsag.chordpractice.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.falconsag.chordpractice.backend.model.AbstractChordVariations;
import org.falconsag.chordpractice.backend.model.Chord;
import org.falconsag.chordpractice.backend.model.ChordData;
import org.falconsag.chordpractice.backend.model.ChordRequest;
import org.falconsag.chordpractice.backend.model.ChordVariations;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChordPracticeController {
	private final Random rand = new Random();
	private final ChordData chordData;

	public ChordPracticeController(ObjectMapper om) throws IOException {
		try (InputStream is = getClass().getResourceAsStream("/chords.json")) {
			chordData = om.readValue(is, ChordData.class);
		}
	}

	@PostMapping(value = "/chord", produces = "application/json")
	public Chord getChord(@RequestBody ChordRequest request) {
		return getRandomChord(request);
	}

	private Chord getRandomChord(ChordRequest request) {
		Map<String, List<ChordVariations>> chordsMap = chordData.getChords();
		Set<String> requestedKeys = request.getKeys();
		String randomKey = requestedKeys.stream().skip(rand.nextInt(requestedKeys.size())).findFirst().get();
		List<ChordVariations> chords = chordsMap.get(randomKey);
		Map<String, ChordVariations> chordsByKey = chords.stream().collect(Collectors.toMap(AbstractChordVariations::getSuffix, Function.identity()));
		Collection<ChordVariations> chordVariations = chordsByKey.values();
		ChordVariations selectedVariations = chordVariations.stream().skip(rand.nextInt(chordVariations.size())).findFirst().get();
		List<Chord> ch = selectedVariations.getPositions();
		int idx = rand.nextInt(ch.size());
		Chord selectedChord = ch.get(idx);
		return selectedChord.withName(selectedVariations.getKey() + selectedVariations.getSuffix());
	}

}
