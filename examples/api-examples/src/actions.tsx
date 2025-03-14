import {
  ActionPanel,
  CopyToClipboardAction,
  Detail,
  Icon,
  OpenInBrowserAction,
  OpenWithAction,
  PasteAction,
  showHUD,
  ShowInFinderAction,
  showToast,
  ToastStyle,
} from "@raycast/api";
import open from "open";
import { homedir } from "os";
import { resolve } from "path";

const description = `
# Actions

The [Action Panel](https://www.notion.so/raycastapp/Action-Panel-d142399d7e3b45018675d64612c63174)
lets you find and take any action with just a few keystrokes. Press \`⌘ + K\` to search for all
available actions in the panel.

## Built-in actions

Leverage one of the built-in actions to quickly add functionality to your commands:
- Use the \`CopyToClipboardAction\` to copy text to the clipboard
- Use the \`OpenInBrowserAction\` to open links in the browser
- Use the \`ShowInFinderAction\` to show files or folders in the Finder
- Use the \`PasteAction\` to paste text to the frontmost application

## Custom actions

Use the \`ActionPanel.Item\` to extend your commands even further. Specify a title, icon and action 
handler. Or wrap it in a separate React component to reuse it.

## Keyboard shortcuts

Assign keyboard shortcuts to actions to make it quicker for users to perform them. By default, the 
first two actions get the primary (\`↵\`) and secondary shortcut (\`⌘ + ↵\`).
`;

const downloadsDir = resolve(homedir(), "Downloads");

export default function Command() {
  return (
    <Detail
      markdown={description}
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Built-in actions">
            <CopyToClipboardAction content="Text copied to the clipboard" />
            <OpenInBrowserAction url="https://raycast.com" />
            <ShowInFinderAction title="Open Downloads" path={downloadsDir} />
            <PasteAction content="Text pasted to the frontmost application" />
            <OpenWithAction path={downloadsDir} />
          </ActionPanel.Section>
          <ActionPanel.Section title="Custom actions">
            <ActionPanel.Item
              title="Custom Action"
              icon={Icon.Dot}
              shortcut={{ modifiers: ["cmd"], key: "." }}
              onAction={() => showToast(ToastStyle.Success, "Performed custom action")}
            />
            <ReusableAction title="Hey 👋" />
            <ActionPanel.Submenu title="Open With..." icon={Icon.Globe}>
              <ActionPanel.Item
                title="Google Chrome"
                onAction={() => open("https://raycast.com", { app: { name: open.apps.chrome } })}
              />
              <ActionPanel.Item
                title="Safari"
                onAction={() => open("https://raycast.com", { app: { name: "Safari" } })}
              />
            </ActionPanel.Submenu>
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

function ReusableAction(props: { title: string; icon?: Icon }) {
  return (
    <ActionPanel.Item
      title="Reusable Action"
      icon={props.icon ?? Icon.Star}
      shortcut={{ modifiers: ["cmd", "shift"], key: "b" }}
      onAction={() => showHUD(props.title)}
    />
  );
}
