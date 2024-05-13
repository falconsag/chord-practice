package org.falconsag.chordpractice.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.util.List;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ChordVariations.class, builder = ChordVariations.Builder.class)
public interface AbstractChordVariations {

	List<Chord> getPositions();

	String getSuffix();

	String getKey();
}
