# Contributing

## What is the workflow?

1 - Create and describe your proposal in an issue

2 - Create a new branch AND merge request with the pattern `issue/MY_FEATURE`

3 - Write your tests BEFORE your code, MERGE REQUESTS WITHOUT TEST WILL BE REJECTED

4 - Commit your code using we coventional commit, COMMITS OUTSIDE THE CONVENTIONAL WILL BE REJECTED

5 - Write a docs for your changes, MERGE REQUESTS WITHOUT DOCS WILL BE REJECTED

6 - Generete a new CHANGELOG with yours commit using the script python below 


## Conversion of Commits and Semantic Versioning

**Commit Structure**

```
<type>(escope): <description>

[Body]
What does the modification do?
why was it modified?

[Baseboard]
<break> <issue> <labels> 
```

**Types**



- *[Major] deprecated* : Modification that breaks compatibility
- *[Minor] issued* : Resolve any issues
- *[Patch] added* : A commit what introduce a modification with as broke compability
- *[Patch] fixed* : A commit that affects the build system, added or excluding pendencies.
- *removed* : Adds or repair tests 
- *changed* : A commit what did not add a recurse and not repair a bug

**Baseboard**

- *break* : Indicates which incompatibility
- *issue* : Update the status of `issue`
- *labels* : Check and uncheck `labels`

## Add *Convetional Commit* as default

- Create a global git commit hook

1. Enable git templates:
```
git config --global init.templatedir `'~/.git-templates'`
```

This tells git to copy everything in `~/.git-templates` to your per-project `.git/` directory when you run `git init`

2. Create a directory to hold the global hooks:
```
mkdir -p ~/.git-templates/hooks
```
3. Write your hook in ~/.git-templates/hooks.

Add the archive `commit-msg` with this content:

```py
#!/usr/bin/env python3
import re, sys, os

# example:
# feat(apikey): added the ability to add api key to configuration
pattern = r'(deprecated|issued|added|fixed|removed|changed)(\([\w\-]+\))?:\s.*'
    

class InvalidPatternCommit(Exception):
    def __init__(self, commit) -> None:
        print(
            f"\033[93mYour Commit: {commit}\033[0m" \
            f"\033[92mSugestion: {self.helper(commit)}\033[0m" \
            "\033[91m"
        )

    def helper(self, commit) -> str:
        if commit.startswith("depr"):
            return "did you mean `deprecated:`?"
        elif commit.startswith("iss"):
            return "did you mean `issued:`?"
        elif commit.startswith("add"):
            return "did you mean `added:`?"
        elif commit.startswith("fix"):
            return "did you mean `fixed:`?"
        elif commit.startswith("rem"):
            return "did you mean `removed:`?"
        elif commit.startswith("cha"):
            return "did you mean `changed:`?"
        else:
            return "Your commit is not in default\n"\
                "https://git.lunes.io/blockchain/labs/best-practices"

def main():
    filename = sys.argv[1]
    commit = open(filename, 'r').read()
    m = re.match(pattern, commit)
    if m == None:
        raise InvalidPatternCommit(commit)

if __name__ == "__main__":
    main()
```
4. Make sure the hook is `executable`.
```
chmod a+x ~/.git-templates/hooks/commit-msg
```

5. Re-initialize git in **`each` existing repo** you'd like to use this in:
```
git init
```

`NOTE:` if you already have a hook defined in your local git repo, this will not overwrite it.

## How to generate Changelog

Save this script below as `script.py` 
and run `python3 scrip.py`

```py
from os import remove, system as sys
from datetime import datetime, timedelta
def generate_logs():
    sys('git log --pretty="- [%h](%H) %s [%ai]" > ./logs.txt')
def read_logs() -> list:
    with open('./logs.txt', 'r') as file:
        logs = file.readlines()
    remove("./logs.txt")
    return logs
def edit_logs(logs: list) -> list:
    range_date = {}
    for line in logs:
        range_date[line[-27:-17]] = []
        for commit in logs:
            if line[-27:-17] == commit[-27:-17]:
                range_date[line[-27:-17]].append(commit)
    changelog = ['# Changelog\n']
    for date in range_date.keys():
        changelog.append(f"\n## {date}\n")
        for commit in range_date[date]:
            edited_commit = commit[:-29] + '\n'
            changelog.append(edited_commit)
    
    return changelog
def save_changelog(changelog: list):
    with open('./docs/CHANGELOG.md', 'w') as file:
        file.writelines(changelog)
generate_logs()
logs = read_logs()
changelog = edit_logs(logs)
save_changelog(changelog)
```



## References

- [Good Practices](https://bestpractices.coreinfrastructure.org/pt-BR)
- [Semantic Versioning](https://semver.org/lang/pt-BR/)
- [More about Versioning](http://www.modelcvs.org/versioning/)
- [Versioning Automate](https://bhuwanupadhyay.github.io/2020/04/applying-semantic-versioning-with-git-repository/)
- [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits)
- [Default Angular Commit](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Global hook for repositories](https://docs.gitlab.com/ce/administration/server_hooks.html#set-a-global-server-hook-for-all-repositories)
- [More about Commits](https://chris.beams.io/posts/git-commit/)
- [Quick Actions for Commits](https://docs.gitlab.com/ee/user/project/quick_actions.html)
- [Commits examples](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
- [Full Tutorial Add Convetional Commit as default](https://prahladyeri.com/blog/2019/06/how-to-enforce-conventional-commit-messages-using-git-hooks.html)
- [Create a global git commit hook](https://coderwall.com/p/jp7d5q/create-a-global-git-commit-hook)
