For most of my work these days I'm using opencode with Kimi K2.5. Open weight model let me conserve the budget and not lock myself into constantly rising prices of anthropic models. Though I must admit, sometimes researching complex topics with sonnet.

Before I didn't have a chance to combine figma with LLM through their MCP or any other way. I only know models work better with detecting objects from raster images rather than understanding something from vector like SVG. So on first attempt I through all png exports into model though dind't get properly structured result and reduce the scope to only first Applications page and asked to dissect the image into atomic design (widely known structuring convention by Brad Frost).

Once the first version is generated I started planning and refining this result iterating over each generated component with new context. This way models see more clear picture and not poluted with previous discussions.

For design system I prefer to use classes to separate behavior from design. The best example would be button and link which both could have the the same visual representation but having different behavior and requires different configuration.

Even better approach would be using upcoming CSS mixins. They would bring a couple benefits:

- Typography design tokens could be more complete using mixin, because now letter-spacing should be specified separately in addition to font shorthand.
- Some atoms would benefit from reusing between different selectors like input and textarea, or menu and select:picker(select).

With the next "Generator" page the process gets easier since the model understands ideas and conventions from existing code.
