package org.falconsag.chordpractice.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.util.List;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ChordQualities.class, builder = ChordQualities.Builder.class)
public interface AbstractChordQualities {

	List<Chord> getPositions();

	String getSuffix();

	String getKey();
}
