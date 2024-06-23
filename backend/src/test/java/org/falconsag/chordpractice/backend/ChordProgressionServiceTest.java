package org.falconsag.chordpractice.backend;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChordProgressionServiceTest {


	@Autowired
	private ChordProgressionService service;

	@Test
	void testMajorScale() {
		assertThat(service.getNotesOfScale("C", "major")).isEqualTo("C D E F G A B");
		assertThat(service.getNotesOfScale("G", "major")).isEqualTo("G A B C D E F#");
		assertThat(service.getNotesOfScale("D", "major")).isEqualTo("D E F# G A B C#");
		assertThat(service.getNotesOfScale("A", "major")).isEqualTo("A B C# D E F# G#");
		assertThat(service.getNotesOfScale("E", "major")).isEqualTo("E F# G# A B C# D#");
		assertThat(service.getNotesOfScale("F", "major")).isEqualTo("F G A Bb C D E");
		assertThat(service.getNotesOfScale("Bb", "major")).isEqualTo("Bb C D Eb F G A");
		assertThat(service.getNotesOfScale("Eb", "major")).isEqualTo("Eb F G Ab Bb C D");
		assertThat(service.getNotesOfScale("Ab", "major")).isEqualTo("Ab Bb C Db Eb F G");
		assertThat(service.getNotesOfScale("B", "major")).isEqualTo("B C# D# E F# G# A#");
		assertThat(service.getNotesOfScale("Cb", "major")).isEqualTo("Cb Db Eb Fb Gb Ab Bb");
		assertThat(service.getNotesOfScale("F#", "major")).isEqualTo("F# G# A# B C# D# E#");
		assertThat(service.getNotesOfScale("Gb", "major")).isEqualTo("Gb Ab Bb Cb Db Eb F");
		assertThat(service.getNotesOfScale("C#", "major")).isEqualTo("C# D# E# F# G# A# B#");
		assertThat(service.getNotesOfScale("Db", "major")).isEqualTo("Db Eb F Gb Ab Bb C");
	}
}
