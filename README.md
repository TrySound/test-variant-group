For most of my work these days I'm using opencode with Kimi K2.5. Open weight model let me conserve the budget and not lock myself into constantly rising prices of anthropic models. Though I must admit, sometimes researching complex topics with sonnet.

Before I didn't have a chance to combine figma with LLM through their MCP or any other way. I only know models work better with detecting objects from raster images rather than understanding something from vector like SVG. So on first attempt I through all png exports into model though dind't get properly structured result and reduce the scope to only first Applications page and asked to dissect the image into atomic design (widely known structuring convention by Brad Frost).

Once the first version is generated I started planning and refining this result iterating over each generated component with new context. This way models see more clear picture and not poluted with previous discussions.

For design system I prefer to use classes to separate behavior from design. The best example would be button and link which both could have the the same visual representation but having different behavior and requires different configuration.

Even better approach would be using upcoming CSS mixins. They would bring a couple benefits:

- Typography design tokens could be more complete using mixin, because now letter-spacing should be specified separately in addition to font shorthand.
- Some atoms would benefit from reusing between different selectors like input and textarea, or menu and select:picker(select).

For typography I left spacing in a bit loose state with default margins and margin-trim-ish solution to make it isolated from affecting outside spacing.

With the next "Generator" page the process gets easier since the model understands ideas and conventions from existing code.

Figma is using 4 variants of Fixel font. Each takes about 50kB. Ideally those should be bundled into single variable font to download less. In this case I'll just connect each variation individually. Though the fourth is used only for input labels which I think a bit excessive and as a tradeoff will give it font weight 600 instead.

The next thing would be assembling the actual app. I threw requirements into model and iterated over plan. The generated code was somewhat working. Though years of react-router completely changing its API and bad practices used in react result in bad practices like updating states in effects while it could be used directly. This is went through and cleaned up by hands.

Now I noticed outline button actually has strong resemblance with icon button so I can reuse its styles for it and make button--icon modifier adjust only paddings.

Next testing the app over and over again noticing differences from figma like "Generating..." instead of spinner, editing existing letter instead of creating new one etc. All this LLM is able to handle once described.

Then researched some options for LLM and end up with using opencode go (my opencode subscription) to generate cover letters.

Another tricky edge case is api endpoints in naked vite. Something like react-router in framework mode would solve this though to make it simpler I went with separate hono server.
