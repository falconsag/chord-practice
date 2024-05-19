package org.falconsag.chordpractice.backend;

import java.util.List;
import org.falconsag.chordpractice.backend.model.Chord;
import org.falconsag.chordpractice.backend.model.ChordRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChordPracticeController {

	private final ChordPracticeService service;

	public ChordPracticeController(ChordPracticeService chordPracticeService) {
		this.service = chordPracticeService;
	}

	@PostMapping(value = "/chord", produces = "application/json")
	public Chord getChord(@RequestBody ChordRequest request) {
		return service.getRandomChord(request);
	}


	@GetMapping(value = "/chords/personal", produces = "application/json")
	public List<Chord> getPersonalChord() {
		return service.getPersonalChords();
	}


}
