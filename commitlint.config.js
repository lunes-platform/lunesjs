module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["fixed", "added", "merged", "refactored", "deprecated"]
        ]
    }
}
