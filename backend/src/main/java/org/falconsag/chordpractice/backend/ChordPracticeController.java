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
import org.falconsag.chordpractice.backend.model.ChordVariations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping(value = "/chord", produces = "application/json")
	public Chord getChord() {
		return getRandomChord();
	}

	private Chord getRandomChord() {
		Map<String, List<ChordVariations>> chordsMap = chordData.getChords();
		int i = rand.nextInt(chordsMap.size());
		Set<Map.Entry<String, List<ChordVariations>>> entries = chordsMap.entrySet();
		int currCount = -1;
		Iterator<Map.Entry<String, List<ChordVariations>>> it = entries.iterator();
		List<ChordVariations> chords = null;
		while (currCount++ < i) {
			chords = it.next().getValue();
		}
		Map<String, ChordVariations> chordsByKey = chords.stream().collect(Collectors.toMap(AbstractChordVariations::getSuffix, Function.identity()));

		Collection<ChordVariations> chordVariations = chordsByKey.values();
		ChordVariations selectedVariations = chordVariations.stream().skip(rand.nextInt(chordVariations.size())).findFirst().get();
		List<Chord> ch = selectedVariations.getPositions();
		int idx = rand.nextInt(ch.size());
		Chord selectedChord = ch.get(idx);
		return selectedChord.withName(selectedVariations.getKey() + selectedVariations.getSuffix());
	}

}
