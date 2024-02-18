# ai-log

Περιεχόμενα:

- Όλα τα αρχεία του ai-tools-questionnaire - Softeng 2023-24 που ανεβάσατε είτε με το frontend http://galileo.softlab.ntua.gr:3001/ είτε με το CLI tool "se23*.sh"

  
Προσοχή 1: προσπαθείστε τα ονόματα αρχείων να διευκολύνουν την ταξινόμηση πχ 2023-10-29-16:55-req.zip
  
Προσοχή 2: κάθε αρχείο zip περιέχει α) το αρχείο μεταδεδομένων και β) το σύνολο του διαλόγου (prompts & answers) με το εργαλείο.
  
Δείτε το video: https://youtu.be/eUAjxCRNODU

```bash
{
    "answers": {
        "phase": ["requirements gathering", "requirements specification", "architecture", "design", "coding", "testing", "deployment"],
        "action": ["problem understanding", "stakeholder statement", "requirements (functional)", "requirements (non-functional)", "use case specification", "architectural decision", "design decision","data design", "source code authoring", "unit testing", "functional testing", "integration testing", "performance testing","other testing", "dev-ops", "vm operations", "container operations","network operations", "code management"],
        "scope": ["documentation (text)", "uml activity", "uml sequence", "uml component", "uml deployment", "uml class", "uml other", "database design", "frontend", "data management", "backend", "api", "cli", "test cases", "test code driver", "test execution scripts", "deployment scripts", "code management actions"],
        "action experience": ["big", "fair", "little", "none"],
        "prog lang": ["n/a", "js", "js-node", "python", "sql", "nosql db", "java", "other"],
        "other prog lang": "<fill in>",
        "tool": ["chat gpt 3.x", "chat gpt 4.x", "bard", "github copilot", "scribe", "intellij IDEA", "other"],
        "other tool": "<fill in>",
        "tool option": ["free", "free trial", "full"],
        "tool experience": ["none", "some", "enough", "master"],
        "time allocated (h)": "<fill in>",
        "time saved estimate (h)": "<fill in>", 
        "quality of ai help": ["ready-to-use", "minor modifications needed", "major modifications needed", "unusable"],
        "generic feeling": ["great as-is", "great in the future", "needs work", "makes not sense"],
        "notes": "<fill in>"
    }
}
```