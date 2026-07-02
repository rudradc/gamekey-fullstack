import hmac
import hashlib
import json
import requests


def send_expiry_webhook(publisher, game_key_str, game_title, expired_at):
    """Synchronous webhook sender (Day 7 reference implementation).

    Superseded in production by the async Celery task in tasks.py, kept
    here as the original synchronous version for reference/testing.
    """
    payload = {
        "event": "game_key.expired",
        "game_key": game_key_str,
        "game_title": game_title,
        "expired_at": expired_at.isoformat(),
    }

    secret = publisher.webhook_secret.encode('utf-8')
    # sort_keys=True guarantees deterministic byte output so signatures match
    body = json.dumps(payload, sort_keys=True).encode('utf-8')
    signature = hmac.new(secret, body, hashlib.sha256).hexdigest()

    headers = {
        "Content-Type": "application/json",
        "X-Signature": f"sha256={signature}",
    }

    try:
        response = requests.post(publisher.webhook_url, json=payload, headers=headers, timeout=5)
        response.raise_for_status()
    except Exception as e:
        print(f"[Webhook] Delivery failed for publisher {publisher.id}: {e}")
