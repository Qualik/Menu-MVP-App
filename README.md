# Project Requirement (MVP)

End Product: Full Point of Sale (POS) system
MVP: Controlable/CMS-able food menu

## Definition of Done

- console app that logs the state
- CRUD operations to make it CMS-able

## Data

### Nouns/Entities => Objects

- Menu
- Menu Items

#### Properties

##### Menu

Nothing (at this stage)

###### Menu Item

- _id
- name
- price
- stock level
- description
- tags [] - cusinies; diets

#### Verbs => fucntions/Methods

##### Menu Class

<!-- instance methods -->
- setup (constructor) - put items into the 4 sections
- add item [s]
- get item [s]
- update item [s]
- delete item [s]

##### Menu Item Class

- validate

<!-- validate is the data you are inputting is correct / schema is to ensure data purity ie validation ensuring it is the correct format -->