package org.falconsag.chordpractice.backend;

import java.util.List;
import org.falconsag.chordpractice.backend.model.Chord;
import org.falconsag.chordpractice.backend.model.ChordRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChordPracticeController {

	private final ChordPracticeService service;
	private final ChordProgressionService chordProgressionService;


	public ChordPracticeController(ChordPracticeService chordPracticeService, ChordProgressionService chordProgressionService) {
		this.service = chordPracticeService;
		this.chordProgressionService = chordProgressionService;
	}

	@PostMapping(value = "/chord", produces = "application/json")
	public Chord getChord(@RequestBody ChordRequest request) {
		return service.getRandomChord(request);
	}


	@GetMapping(value = "/chords/personal", produces = "application/json")
	public List<Chord> getPersonalChord() {
		return service.getPersonalChords();
	}

	@GetMapping(value = "/notes", produces = "application/json")
	public String getNotesInScale(@RequestParam String key){
		return chordProgressionService.getNotesOfScale(key, "major");
	}
}
