# Infomaniak Environment Setup

Generic runbook for adding a deployment environment on the Infomaniak managed Cloud Server. Follow this for each new environment (development, preview, public).

Do not paste secrets, keys, paths, or IPs into this document. This file is committed to a public repo.

## Prerequisites

- Access to Infomaniak Manager (manager.infomaniak.com)
- Access to GitHub repo settings (Settings > Secrets and variables > Actions, Settings > Environments)
- A local terminal with `ssh-keygen` and `ssh` available
- A domain or subdomain ready to point at the environment

## Step 1: Create an FTP/SSH user

1. Infomaniak Manager > Hosting solution > (your hosting) > **FTP / SSH**
2. Click **Add a user**
3. Choose a username and password. Enable SSH access.
4. Note the assigned username (may be prefixed by Infomaniak, e.g. `xxxxx_yourname`)
5. Note the SSH hostname shown on the FTP/SSH page (e.g. `xxxxx.ftp.infomaniak.com`)

You need the password for the initial SSH connection only. After key setup, password auth is not used.

## Step 2: Create a site

1. Infomaniak Manager > Hosting solution > (your hosting) > **Add site**
2. Select **Create a blank project** (Advanced)
3. Technology: **Apache/PHP** (static files served by Apache, supports `.htaccess` and `mod_rewrite`)
4. PHP version: latest recommended (irrelevant for static sites, but required by the form)
5. Domain: select **Use an existing Domain Name or sub-domain**, choose **Subdomain**, enter the subdomain name (e.g. `dev`) on your domain
6. SSL: keep **Secure your website with a free SSL certificate** checked
7. DNS: keep **Automatically update the DNS** checked
8. Location: note the folder name or set one manually
9. Complete the wizard

After creation, find the **Full path** in the site's "More information" section. It will look like `/sites/subdomain.domain.tld`. The absolute deploy path is:

```
/home/clients/<CLIENT_ID>/sites/<SITE_FOLDER>/
```

The `<CLIENT_ID>` is visible in the hosting's "More information" section.

## Step 3: Generate an SSH key pair

Run on your **local machine** (not through AI chat, not on the server):

```bash
ssh-keygen -t ed25519 -C "github-actions-<ENV>" -f ~/.ssh/infomaniak_<ENV> -N ""
```

Replace `<ENV>` with the environment name (e.g. `deploy_dev`, `deploy_preview`, `deploy_public`).

This produces two files:
- `~/.ssh/infomaniak_<ENV>` — private key (stays local, goes to GitHub)
- `~/.ssh/infomaniak_<ENV>.pub` — public key (goes to the server)

### Security note

- Never display the private key in AI chat, shared terminals, or logs.
- Copy it to GitHub secrets directly from your own terminal.
- The private key has no passphrase because CI requires non-interactive auth.
- Ed25519 only. Infomaniak refuses RSA keys.

## Step 4: Upload public key to Infomaniak

Use the **SSH console** in Infomaniak Manager (FTP/SSH page) or connect via password:

```bash
ssh <USER>@<HOST>
```

Then run:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "<CONTENTS_OF_PUBLIC_KEY_FILE>" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Verify:

```bash
cat ~/.ssh/authorized_keys
```

You should see your `ssh-ed25519 AAAA...` line.

## Step 5: Verify SSH key auth

From your **local terminal**:

```bash
ssh-keyscan <HOST> >> ~/.ssh/known_hosts
ssh -i ~/.ssh/infomaniak_<ENV> <USER>@<HOST> "echo CONNECTION_OK"
```

If you see `CONNECTION_OK`, key auth works. Also verify rsync:

```bash
ssh -i ~/.ssh/infomaniak_<ENV> <USER>@<HOST> "which rsync"
```

Expected output: `/usr/bin/rsync`

## Step 6: Add GitHub secrets

Go to your repo's Settings > Secrets and variables > Actions.

All secret names use the prefix `<ENV>_` (e.g. `DEVELOPMENT_`, `PREVIEW_`, `PUBLIC_`).

| Secret | Value source |
|---|---|
| `<ENV>_SSH_PRIVATE_KEY` | Contents of `~/.ssh/infomaniak_<ENV>` (copy from your terminal, not through AI) |
| `<ENV>_SSH_HOST` | FTP/SSH page in Infomaniak Manager |
| `<ENV>_SSH_USER` | FTP/SSH page in Infomaniak Manager |
| `<ENV>_SSH_PORT` | Usually `22` |
| `<ENV>_DEPLOY_PATH` | Full absolute path from Step 2, must end with `/` |
| `<ENV>_ALLOWED_IPS` | Your static IPs, comma-separated (omit for public environments) |

## Step 7: Add GitHub variable

Go to your repo's Settings > Secrets and variables > Actions > Variables tab.

| Variable | Value |
|---|---|
| `<ENV>_SITE_URL` | The canonical URL for this environment (e.g. `https://<subdomain>.<domain>`) |

## Step 8: Create or update the GitHub Actions workflow

- Copy an existing workflow (e.g. `deploy-dev.yml`) and update the secret/variable references to use the new `<ENV>_` prefix.
- Set the `environment:` field to match the environment name.
- Set the trigger (push to `main`, manual dispatch, or both).
- For public environments: remove the `.htaccess` generation step.

## Step 9: Test deployment

Either push to `main` or use the **Run workflow** button in the Actions tab.

Watch the workflow run. If it fails, the step name and error message indicate which value is wrong. Common issues:

| Symptom | Cause | Fix |
|---|---|---|
| `Permission denied (publickey)` | Wrong key or permissions | Verify ed25519, check chmod 600/700 on server |
| `Host key verification failed` | Host not in known_hosts | `ssh-keyscan` runs in the workflow, check SSH_HOST value |
| rsync exits non-zero | Wrong deploy path | Verify the path exists and ends with `/` |
| 403 Forbidden on the site | `.htaccess` blocking your IP | Update `ALLOWED_IPS` secret with your current IP (`curl ifconfig.me`) |
| 403 but IP is correct | Cloudflare proxy not sending real IP | Verify domain is proxied (orange cloud) in Cloudflare DNS, check `CF-Connecting-IP` header |
| Wrong URLs in the site | `SITE_URL` not set | Check the variable name and value |

## Step 10: Record values locally

Copy the connection details into `.local/config.md` (gitignored) so you have them for manual deployment and so agents can read them without accessing GitHub secrets. The template is at `.local.example.md`.

## Step 11: Verify the live site

Visit the domain. If IP-restricted, make sure you're on an allowed IP. Check:

- Pages load correctly
- Navigation works
- SSL certificate is active (may take a few minutes on first setup)

## Environment checklist

Use this checklist for each new environment:

- [ ] FTP/SSH user created with SSH enabled
- [ ] Site created with Apache/PHP, domain bound, SSL enabled
- [ ] SSH key pair generated locally (ed25519, no passphrase)
- [ ] Public key uploaded to server `~/.ssh/authorized_keys`
- [ ] Key-based SSH connection verified from local machine
- [ ] rsync confirmed available on server
- [ ] All 6 GitHub secrets added (or 5 for public, no ALLOWED_IPS)
- [ ] GitHub variable added (`<ENV>_SITE_URL`)
- [ ] Workflow file created/updated
- [ ] Deployment tested via Actions
- [ ] Live site verified
