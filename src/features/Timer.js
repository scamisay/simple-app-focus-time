import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { Timing } from "./Timing";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { useKeepAwake } from "expo-keep-awake";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Remote debugger"]);

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.3);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setMinutes(0.1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Enfocandote en:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="iniciar" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pausar" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="x" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.1,
    padding: spacing.lg,
    flexDirection: "row",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    paddingTop: spacing.xxl,
    justifyContent: "center",
  },
  title: { color: colors.white, fontWeight: "bold", textAlign: "center" },
  task: { color: colors.white, textAlign: "center" },
  clearSubjectWrapper: { flexDirection: "row", justifyContent: "center" },
});
