# Sync

> **Warning**
> As of v1.110.1 The sync command does not work on Windows commandline. This will shortly be fixed. For now, please use WSL.  

Synchronizing folders & git repositories to a Windmill instance is made easy
using the wmill CLI. Syncing operations are behind the `wmill sync` subcommand.

## Example Repos

We provide an example repo for syncing with Windmill:

- Syncing with a remote:
  [windmill-sync-example](https://github.com/windmill-labs/windmill-sync-example)

## Raw Syncing

Raw syncing is a one-off operation with no state maintained. It's best used for
making backups, cloning a complete workspace, and similar one-off operations.

Raw syncing is done using `wmill sync pull --raw` & `wmill sync push --raw`

### Pulling

`wmill sync pull --raw` will simply pull all files from the currently
[selected workspace](./workspace-management.md#selected-workspace) and store
them in the current folder. Overwrites will not prompt the user. Make sure you
are in the correct folder or you may loose data.

### Pushing

`wmill sync push --raw` will simply push all local files to the currently
[selected workspace](./workspace-management.md#selected-workspace), creating or
updating the remote equivalents.

### Operation

## Stateful Syncing

Stateful syncing is best used when you want to continuously syncronize a folder
or git(hub) repository with a windmill instance. The CLI will automatically
maintain state for you and ensure modifications that happen concurrently on the
remote and locally stay in sync.

### Pulling

Pulling with `wmill sync pull` will first update the internal sync state, and then
generate a diff between your local files and this state, only updating the
actually modified files. Possible conflicts will warn the user.

### Pushing

Pushing with `wmill sync push` will push all local files to the remote and then update the internal state to avoid being out-of-sync due to the push.
Using `sync push` without `--skip-pull` will start the push by doing a pull first to ensure the user is not
overriding changes made to the remote.

## Pull API

The `wmill sync pull` command is used to pull remote changes and apply them locally. It synchronizes the local workspace with the remote workspace by downloading any remote changes and updating the corresponding local files.

```bash
wmill sync pull [options]
```

### Options

| Option             | parameter | Description                                                                                                        |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `--fail-conflicts` | None      | Error on conflicts (both remote and local have changes on the same item).                                          |
| `--yes`            | None      | Pull without needing confirmation. The command proceeds automatically without user intervention.                   |
| `--raw`            | None      | Pull without using state, just overwrite. The command operates in raw mode without utilizing local state tracking. |
| `--plain-secrets`  | None      | Pull secrets as plain text. Secrets are downloaded without encryption or obfuscation.                              |
| `--json`           | None      | Use JSON instead of YAML. The downloaded files are in JSON format instead of YAML.                                 |

## Push API

The `wmill sync push` command is used to push local changes and apply them remotely. It synchronizes the remote workspace with the local workspace by uploading any local changes and updating the corresponding remote files.

```bash
wmill sync push [options]
```

### Options

| Option             | parameter | Description                                                                                                        |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `--fail-conflicts` | None      | Error on conflicts (both remote and local have changes on the same item).                                          |
| `--skip-pull`      | None      | Push without pulling first. Assumes that the pull operation has already been performed.                            |
| `--yes`            | None      | Push without needing confirmation. The command proceeds automatically without user intervention.                   |
| `--raw`            | None      | Push without using state, just overwrite. The command operates in raw mode without utilizing local state tracking. |
| `--plain-secrets`  | None      | Push secrets as plain text. Secrets are uploaded without encryption or obfuscation.                                |
| `--json`           | None      | Use JSON instead of YAML. The uploaded files are in JSON format instead of YAML.                                   |

## How `raw` mode works

| Command                 | Description                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `wmill sync pull`       | Pulls remote changes and applies them locally.                                                 |
| `wmill sync pull --raw` | Pulls remote changes without using state tracking. Overwrites local files with remote changes. |
| `wmill sync push`       | Pushes local changes and applies them remotely.                                                |
| `wmill sync push --raw` | Pushes local changes without using state tracking. Overwrites remote files with local changes. |

## Erasing Remote Files Not Present Locally

In some cases, you may want to ensure that the remote workspace reflects exactly what is present in your local directory, removing any files on the remote that are not present locally. The wmill sync push command provides an option called --skip-pull that allows you to achieve this.

### How it Works

When you use the --skip-pull option with the wmill sync push command, the CLI will push the local changes without performing a pull operation first. It assumes that you have manually performed the pull operation to update the local state.

The command will upload all the local changes to the remote workspace and overwrite any existing remote files. If a file exists on the remote but is not present locally, it will be erased during the push operation.

### Usage

To erase anything on the remote that is not present locally, follow these steps:

1. Make sure you are in the local directory where your files are located.
2. Run the following command to push the local changes and overwrite the remote files:

```bash
wmill sync push --skip-pull
```

This command will upload all the local changes to the remote workspace without checking for any remote changes. Any files on the remote that are not present locally will be erased.

Note: Be cautious when using the --skip-pull option, as it can lead to data loss if used incorrectly. Make sure you have a backup of any important files before using this option.

Using wmill sync push --skip-pull, you can ensure that the remote workspace reflects exactly what is present in your local directory, removing any files on the remote that are not present locally.
