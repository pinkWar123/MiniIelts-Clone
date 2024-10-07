export enum Skills {
  LISTENING,
  READING,
  WRITING,
  SPEAKING,
}

export const SKILL_COLORS: { [key in Skills]: string } = {
  [Skills.LISTENING]: "blue",
  [Skills.READING]: "green",
  [Skills.WRITING]: "orange",
  [Skills.SPEAKING]: "red",
};
