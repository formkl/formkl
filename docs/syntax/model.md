# Form model

There are 2 types of form model: basic and flattened

By default, formkl will use the basic model

```bash
formkl ["base" | "flat"]
```

## Form basic model (base)
```bash
# Basic model declaration
formkl
# or
formkl base
```

The model structure would look like this

```json
{
  "data": [
    {
      "type": "text",
      "label": "Fullname",
      "require": false,
      "key": "fullname",
      "multiple": false
    },
    {
      "type": "paragraph",
      "label": "Bio",
      "require": false,
      "key": "bio",
      "multiple": false
    }
  ]
}
```

## Form flattened model (flat)

If you want to use a flattened model style, you can use the `flat` keyword

```bash
# Flattened model declaration
formkl flat
```

And the model structure would look like this

```json
{
  "fullname": "",
  "bio": ""
}
```