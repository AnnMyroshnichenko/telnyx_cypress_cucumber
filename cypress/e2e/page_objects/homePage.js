class homePage {
  elements = {
    exploreStackButton: () => cy.get('a[href="#full-stack-detail"]').contains(/^Explore the Stack$/i),
    talkToExpertButton: () => cy.contains('a', /^Talk to an Expert$/i),
    stackSection: () => cy.get('#full-stack-detail'),
    agentPlatformSection: () => cy.get('#feature-demo'),
    tabList: () => cy.get('#feature-demo [role="tablist"]'),
    tab: (name) => cy.get('#feature-demo [role="tablist"]').contains('button[role="tab"]', new RegExp(`^${name}$`, 'i')),
    activeTab: () => cy.get('#feature-demo button[role="tab"][aria-selected="true"]'),
    activeIndicator: () => cy.get('#feature-demo [role="tablist"] > span.absolute'),
    activePanel: () => cy.get('#feature-demo [role="tabpanel"][data-state="active"]'),
    chatPanelTitle: (text) => cy.get('#feature-demo [role="tabpanel"][data-state="active"]').contains('span', text),
    chooseModelPanel: () => cy.contains('span', 'CHOOSE MODEL').closest('div').parent(),                
    modelButtons: () => this.elements.chooseModelPanel().find('div.flex.flex-col button'),
    modelButton: (name) => this.elements.chooseModelPanel().contains('button', name),
    selectedModel: () => this.elements.chooseModelPanel().find('button[aria-pressed="true"]'),
    languageSelector: () => cy.get('#feature-demo button[role="combobox"][aria-label="Select language"]'),
    languageDropdown: () => cy.get('[role="listbox"]'),
    languageOption: (language) =>  cy.get('[data-radix-popper-content-wrapper]').contains(language),
    solutionsSection: () => cy.contains('h2', 'Transform workflows across your business.'),
    exploreAiAssistantButton: () => cy.contains('a', /^Explore Our AI Assistant$/i),
    messageForm: () => cy.get('#feature-demo form'),
    messageInput: () => cy.get('#feature-demo form input[type="text"]'),
    sendMessageButton: () => cy.get('#feature-demo form button[type="submit"]'),
    conversation: () => cy.get('#feature-demo').find('.overflow-y-auto'),
    userMessage: (text) => this.elements.conversation().contains(text),
    healthcarePanel: () =>
      cy.get('#usecase-panel-healthcare'),

    learnMoreButton: () =>
      cy.get('#usecase-panel-healthcare')
        .find('a[href="/solutions/healthcare"], a[href="https://telnyx.com/solutions/healthcare"]'),
    startBuildingButton: () => cy.contains('a[href="/sign-up"]', 'START BUILDING'),
    chatLauncher: () => cy.get('button', { includeShadowDom: true }).filter(':visible').last(),
    chatWindow: () => cy.get('[data-widget-theme="light"]'),
    chatHeader: () => cy.contains('h1', 'Ask our'),
    chatInput: () => cy.get('#user-message-input', { includeShadowDom: true }),
    chatMessages: () => cy.get('[data-widget-theme="light"]', { includeShadowDom: true }).contains('Hello', { matchCase: false }),
    chatCloseButton: () => cy.get('[data-widget-theme="light"]', { includeShadowDom: true }).find('[data-state="closed"]'),
 };
}

export default new homePage();