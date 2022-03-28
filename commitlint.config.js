module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["updated", "fixed", "added", "removed"]
        ]
    }
}
