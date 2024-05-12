package org.falconsag.chordpractice.backend;

import java.util.List;
import java.util.Random;
import org.falconsag.chordpractice.backend.model.Chord;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChordPracticeController {

	private final Random rand = new Random();
	private final List<Chord> chords = List.of(Chord.builder()
					.addFrets("0", "2", "2", "0", "0", "0")
					.addFingers("0", "2", "3", "0", "0", "0")
					.build(),
			Chord.builder()
					.addFrets("-1", "3", "2", "0", "1", "0")
					.addFingers("-1", "3", "2", "0", "1", "0")
					.build(),
			Chord.builder()
					.addFrets("-1", "-1", "0", "2", "3", "2")
					.addFingers("-1", "-1", "0", "1", "3", "2")
					.build());

	@GetMapping(value = "/chord", produces = "application/json")
	public Chord getChord() {
		return getRandomChord();
	}

	private Chord getRandomChord() {
		return chords.get(rand.nextInt(chords.size()));
	}

}
