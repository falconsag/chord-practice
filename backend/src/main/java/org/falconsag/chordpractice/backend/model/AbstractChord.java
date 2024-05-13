package org.falconsag.chordpractice.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.annotation.Nullable;
import java.util.List;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = Chord.class, builder = Chord.Builder.class)
public interface AbstractChord {

	@Nullable
	String getName();

	List<String> getFrets();

	List<String> getFingers();

	@Value.Default
	default Boolean getCapo() {
		return false;
	}

	@Value.Default
	default Integer getBaseFret() {
		return 1;
	}

	List<Integer> getBarres();
}
