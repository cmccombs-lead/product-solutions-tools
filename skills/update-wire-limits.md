# Skill: update-wire-limits

**Description:** Looks up a partner's account by name, retrieves current wire limits, and stages a wire limit update for approval before executing.

**Trigger:** User asks to update wire limits for a partner/account, e.g. "update wire limits for Wingspan" or "increase wire transaction limit for [partner]".

---

## Instructions

The business banking team will provide:
- Partner/account name
- Desired new limits (wire transaction, calendar day, rolling 30 day)

Follow these steps:

1. **Find the program** — Search all programs for the partner name. Extract `id`, `name`, and `clientId`.

2. **Find the account** — Call `list_accounts_by_program` with the program ID. Look for the account matching the requested name (e.g. "Operating DDA"). Note the account's `id`, `bankAccountId` (last 4 digits), and existing `controls.wire.limits`.

3. **Stage the request** — Present a confirmation table to the user showing:
   - Account name and last 4 digits of bank account number
   - Program name
   - Current limits vs. requested limits (convert dollar amounts to cents)

   | Field | Current | Requested |
   |---|---|---|
   | Max Transaction | $X | $Y |
   | Calendar Day | $X | $Y |
   | Rolling 30 Day | $X | $Y |

   Also show the exact API call that will be made. Do NOT proceed until the user explicitly approves.

4. **Execute on approval** — POST to the control-policy endpoint:

```bash
curl -X POST "https://mx3r18ur6c-vpce-0b695dae7de2259b6.execute-api.us-east-1.amazonaws.com/prod/actions/v1/control-policy" \
  --header 'Content-Type: application/json' \
  --data '{
    "action_context": {
      "entity_type": "program",
      "entity_id": "<program_id>",
      "actor": {
        "email": "cmccombs@lead.bank",
        "name": "Charles McCombs"
      }
    },
    "action_data": {
      "resource_type": "account_id",
      "resource_value": "<account_id>",
      "ach": {
        "allowed_sec_codes": <existing_allowed_sec_codes>,
        "limits": {
          "calendar_day_limit": {
            "debit": <existing_ach_debit_cal_day>,
            "credit": <existing_ach_credit_cal_day>
          },
          "rolling_30_calendar_day_limit": {
            "debit": <existing_ach_debit_rolling>,
            "credit": <existing_ach_credit_rolling>
          }
        }
      },
      "wire": {
        "limits": {
          "maximum_transaction_amount": {"credit": <max_txn_cents>},
          "calendar_day_limit": {"credit": <cal_day_cents>},
          "rolling_30_calendar_day_limit": {"credit": <rolling_30_cents>}
        }
      },
      "check": {"outgoing_calender_day_limit": 0},
      "instant_payment": {
        "outgoing_calendar_day_limit": 0,
        "outgoing_rolling_30_day_calendar_limit": 0
      }
    }
  }'
```

**Important notes:**
- All limit amounts must be in **cents** (e.g. $200,000 = `20000000`)
- Always carry over the existing ACH limits and allowed_sec_codes — do not zero them out
- The `actor` email/name should reflect the person making the change
- This endpoint is on the internal VPC — it will only work from within the Lead Bank network
- Audit trail: this action is attributed to the lead-mcp service account, not your personal credentials. Make the change in the dashboard at https://internal.prod.leadbank.cloud/payment-tools/production/programs/{program_id}/accounts/{account_id} if personal attribution is required.
