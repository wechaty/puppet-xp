const rules = {
  "no-shadow": "off"
}

module.exports = {
  extends: '@chatie',
  "ignorePatterns": ["src/init-agent-script.ts", "src/init-agent-script.js"],
  rules,
}
