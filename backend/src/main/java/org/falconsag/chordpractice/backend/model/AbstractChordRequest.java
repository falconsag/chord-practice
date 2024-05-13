package org.falconsag.chordpractice.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Set;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ChordRequest.class, builder = ChordRequest.Builder.class)
public interface AbstractChordRequest {

	Set<String> getKeys();
}
