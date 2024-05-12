package org.falconsag.chordpractice.backend.model;

import java.util.List;
import org.immutables.value.Value;

@Value.Immutable
public interface AbstractChord {

	List<String> getFrets();
	List<String> getFingers();
}
