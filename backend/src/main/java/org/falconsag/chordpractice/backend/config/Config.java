package org.falconsag.chordpractice.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.falconsag.chordpractice.backend.model.Chord;
import org.falconsag.chordpractice.backend.model.ChordData;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return objectMapper;
	}

	@Bean
	public ChordData chordData(ObjectMapper om) throws IOException {
		try (InputStream is = getClass().getResourceAsStream("/chords.json")) {
			return om.readValue(is, ChordData.class);
		}
	}

	@Bean
	public List<Chord> personalChordData(ObjectMapper om) throws IOException {
		try (InputStream is = getClass().getResourceAsStream("/personal-chords.json")) {
			return om.readValue(is, new TypeReference<>() {
			});
		}
	}
}
