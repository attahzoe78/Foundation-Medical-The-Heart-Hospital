import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Base path for local files
    base_path = "file://" + os.getcwd() + "/"

    # 1. Verify Landing Page
    print("Verifying Landing Page...")
    page.goto(base_path + "index.html")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/landing_page.png")

    # 2. Verify Risk Assessment
    print("Verifying Risk Assessment...")
    page.get_by_role("link", name="Heart Risk Assessment").click()
    page.wait_for_timeout(1000)

    # Fill the form for a High Risk scenario
    page.get_by_label("Age").fill("65")
    page.wait_for_timeout(500)
    page.get_by_label("Sex").select_option("1")
    page.wait_for_timeout(500)
    page.get_by_label("Resting Blood Pressure").fill("165")
    page.wait_for_timeout(500)
    page.get_by_label("Serum Cholesterol").fill("255")
    page.wait_for_timeout(500)
    page.get_by_label("Maximum Heart Rate").fill("110")
    page.wait_for_timeout(500)
    page.get_by_label("Exercise Induced Angina").select_option("1")
    page.wait_for_timeout(500)

    page.get_by_role("button", name="Calculate Risk Score").click()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/assessment_result.png")

    # 3. Verify Patient Portal & Chat
    print("Verifying Patient Portal...")
    page.get_by_role("link", name="Patient Portal").click()
    page.wait_for_timeout(1000)

    # Interact with AI Chat
    page.get_by_placeholder("Ask about symptoms, medications, or diet...").fill("I am having chest pain")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Send").click()
    page.wait_for_timeout(2000) # Wait for AI response

    page.get_by_placeholder("Ask about symptoms, medications, or diet...").fill("tell me about diet")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Send").click()
    page.wait_for_timeout(2000)

    page.screenshot(path="/home/jules/verification/screenshots/patient_portal_chat.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
