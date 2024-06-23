package org.falconsag.chordpractice.backend;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class ChordProgressionService {

	private List<String> notes = List.of("C/B#", "C#/Db", "D", "D#/Eb", "E/Fb", "E#/F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B/Cb");

	private final Map<String, List<Integer>> scaleSteps = Map.of(
			"major", List.of(2, 2, 1, 2, 2, 2, 1),
			"minor", List.of(2, 1, 2, 2, 1, 2, 2)
	);

	private final Map<String, List<String>> progressionMap = Map.of(
			"major", List.of("I", "IV", "V"),
			"minor", List.of("i", "iv", "V")
	);

	public String getNotesOfScale(String key, String scale) {
		List<Integer> steps = scaleSteps.get(scale);
		List<String> scaleNotes = new ArrayList<>();
		scaleNotes.add(key);

		int noteIndex = getNoteIndex(key);
		if (noteIndex == -1) {
			throw new ChordPracticeException("Invalid key");
		}

		for (int i = 0; i < steps.size() - 1; i++) {
			Integer halfSteps = steps.get(i);
			noteIndex = (noteIndex + halfSteps) % notes.size();
			List<String> newNote = Arrays.stream(notes.get(noteIndex).split("/")).toList();
			if (newNote.size() == 1) {
				scaleNotes.add(newNote.get(0));
			} else {
				String cleanedNewNote = newNote.get(0).replace("#", "").replace("b", "");
				Set<String> clearedPrevNotes = scaleNotes.stream().map(note -> note.replace("#", "").replace("b", "")).collect(Collectors.toSet());
				if (clearedPrevNotes.stream().noneMatch(note -> note.equals(cleanedNewNote))) {
					scaleNotes.add(newNote.get(0));
				} else {
					scaleNotes.add(newNote.get(1));
				}
			}
		}
		return String.join(" ", scaleNotes);
	}

	public int getNoteIndex(String note) {
		for (int i = 0; i < notes.size(); i++) {
			String notesAtIndex = notes.get(i);
			String[] splitNotes = notesAtIndex.split("/");
			for (String splitNote : splitNotes) {
				if (splitNote.equals(note)) {
					return i;
				}
			}
		}
		return -1;
	}
}
