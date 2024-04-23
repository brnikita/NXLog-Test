# Create ‘Password generator’ component.

## Description

General component structure is: input(type text) where generated password will be stored. Copy
button inside the input in order to copy generated password. Input(type range) for selecting
character length for the password. Inputs(type checkbox) for selecting different password
generator options:
- ‘Include Lowercase’
- ‘Include Uppercase’
- ‘Include Numbers’
- ‘Include Symbols’

At least on of the options above should be selected, so user can’t unselect all of them. By
default ‘Include Lowercase’ is selected.
‘Generate’ button which triggers actual password generation.
Every time you click ‘Generate’ button - new password should be generated based on selected
parameters.


## How to install

### `docker-compose up`