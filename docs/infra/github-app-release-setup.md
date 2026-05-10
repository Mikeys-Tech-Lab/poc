# GitHub App Setup for Release Automation

Release Please needs a GitHub App installation token so that its commits and PRs trigger CI workflow runs. The default `GITHUB_TOKEN` cannot trigger workflows due to GitHub's anti-recursion policy.

## Why a GitHub App

| Approach | Triggers workflows | Rotation needed | Attribution |
|---|---|---|---|
| `GITHUB_TOKEN` (default) | No | No | github-actions[bot] |
| Personal Access Token | Yes | Yes (expiry) | Personal account |
| **GitHub App token** | **Yes** | **No** | **App bot account** |

The App token is the canonical approach recommended by both GitHub and Release Please.

## Setup steps

### 1. Create the GitHub App

1. Go to **GitHub Settings > Developer settings > GitHub Apps > New GitHub App**.
   - For an organization: **Organization Settings > Developer settings > GitHub Apps > New GitHub App**.
2. Fill in:
   - **App name**: e.g., `poc-release-bot` (must be globally unique on GitHub)
   - **Homepage URL**: the repository URL
   - **Webhook**: uncheck "Active" (this App does not need webhook events)
3. Under **Repository permissions**, set:
   - **Contents**: Read and write
   - **Pull requests**: Read and write
   - **Issues**: Read and write
4. Under **Where can this GitHub App be installed?**, select "Only on this account".
5. Click **Create GitHub App**.
6. Note the **App ID** displayed on the App's settings page.

### 2. Generate a private key

1. On the App's settings page, scroll to **Private keys**.
2. Click **Generate a private key**.
3. A `.pem` file downloads. Store it securely.

### 3. Install the App on the repository

1. On the App's settings page, click **Install App** in the left sidebar.
2. Select the account/organization.
3. Choose **Only select repositories** and pick the target repository.
4. Click **Install**.

### 4. Store credentials in GitHub

1. Go to the repository **Settings > Secrets and variables > Actions**.
2. Under **Variables** tab, create:
   - Name: `RELEASE_APP_ID`
   - Value: the App ID from step 1
3. Under **Secrets** tab, create:
   - Name: `RELEASE_APP_PRIVATE_KEY`
   - Value: the entire contents of the `.pem` file (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines)

### 5. Verify

1. Push a commit to `main` (or merge a PR).
2. If the push came from a squash-merged PR, make sure the squash-merge title on
   `main` is a Conventional Commit. Release Please parses that title, not the
   branch commits in isolation.
3. Check the Release workflow run in the Actions tab.
4. If `RELEASE_APP_ID` is set, the workflow uses the App token. Release Please PRs should now trigger CI checks (gitleaks, Shai-Hulud, CodeQL).
5. If the variable is missing, the workflow falls back to `GITHUB_TOKEN` (status quo behavior, checks will not trigger on Release PRs).

## Fallback behavior

The `release.yml` workflow degrades gracefully:

```yaml
- name: Generate GitHub App token
  id: app-token
  if: vars.RELEASE_APP_ID != ''
  uses: actions/create-github-app-token@v2
  with:
    app-id: ${{ vars.RELEASE_APP_ID }}
    private-key: ${{ secrets.RELEASE_APP_PRIVATE_KEY }}

- name: Run Release Please
  uses: googleapis/release-please-action@v4
  with:
    token: ${{ steps.app-token.outputs.token || github.token }}
```

When the App is not configured, `steps.app-token.outputs.token` is empty, so the expression falls back to `github.token`. This means the workflow never fails due to missing App credentials, it just reverts to the limited `GITHUB_TOKEN` behavior.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Release Please runs but CI checks don't appear on its PR | `RELEASE_APP_ID` variable not set or App not installed | Follow setup steps above |
| Release workflow succeeds but no Release PR or published GitHub Release appears | The squash-merge title on `main` is not a Conventional Commit, so Release Please finds no parseable release commit | Use a Conventional Commit PR title or merge title, then re-run the release path from a corrected merge or manual operator recovery |
| "Resource not accessible by integration" | App permissions too narrow | Verify Contents, Pull requests, Issues are all Read & write |
| "Could not create installation token" | Private key mismatch or wrong App ID | Re-generate the private key, update the secret |
| CI checks run but `enforce_admins` blocks merge | Unrelated: checks pass, admin merge works normally | Verify all required checks are green |

## Security notes

- The private key is stored as a GitHub secret and never appears in logs.
- Installation tokens expire after 1 hour and are scoped to the single repository.
- The App has no webhook access and cannot be triggered externally.
- The App's permissions are the minimum required for Release Please.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
