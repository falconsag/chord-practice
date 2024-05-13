package org.falconsag.chordpractice.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import java.util.List;
import java.util.Map;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ChordData.class, builder = ChordData.Builder.class)
public interface AbstractChordData {
	Map<String, List<ChordVariations>> getChords();
}
