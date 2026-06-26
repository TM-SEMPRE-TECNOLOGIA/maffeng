import { test, expect } from '@playwright/test';

const PAGE = '/maffeng-site-v16.html';

test.describe('MAFFENG V16 — Seção de Serviços', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
  });

  // ── CARREGAMENTO ───────────────────────────────────────────────

  test('01 · Página carrega sem crash', async ({ page }) => {
    await expect(page).toHaveTitle(/MAFFENG/);
    await page.screenshot({ path: 'test_screenshots/01_carregamento.png', fullPage: false });
  });

  test('02 · Sem erros críticos no console', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const txt = msg.text();
        const ignorar = ['favicon', 'fonts.googleapis', 'fonts.gstatic', 'ERR_NAME_NOT_RESOLVED'];
        if (!ignorar.some(p => txt.includes(p))) errors.push(txt);
      }
    });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(PAGE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    expect(errors, `Erros de console:\n${errors.join('\n')}`).toHaveLength(0);
  });

  // ── ESTRUTURA DOS CARDS ────────────────────────────────────────

  test('03 · Seção serviços existe e tem 4 cards', async ({ page }) => {
    const section = page.locator('#servicos');
    await expect(section).toBeVisible();

    const cards = section.locator('.svc-card');
    await expect(cards).toHaveCount(4);
    await section.screenshot({ path: 'test_screenshots/03_secao_servicos.png' });
  });

  test('04 · Grid 2x2 — dois cards por linha', async ({ page }) => {
    const grid = page.locator('.svc-grid');
    const style = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    // Deve ter 2 colunas (2 valores separados por espaço)
    const cols = style.trim().split(/\s+/).length;
    expect(cols, `gridTemplateColumns tem ${cols} colunas, esperava 2`).toBe(2);
  });

  test('05 · Cards têm borda esquerda vermelha', async ({ page }) => {
    const card = page.locator('.svc-card').first();
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const borderLeft = await card.evaluate(el => getComputedStyle(el).borderLeftColor);
    // rgb(226, 0, 20) = #e20014
    expect(borderLeft, `border-left-color inesperado: ${borderLeft}`).toContain('226');
  });

  test('06 · Cards têm numeração 01–04', async ({ page }) => {
    const nums = page.locator('.svc-num');
    await expect(nums).toHaveCount(4);
    await expect(nums.nth(0)).toHaveText('01');
    await expect(nums.nth(1)).toHaveText('02');
    await expect(nums.nth(2)).toHaveText('03');
    await expect(nums.nth(3)).toHaveText('04');
  });

  test('07 · Cards têm tag de especialidade visível', async ({ page }) => {
    const tags = page.locator('.svc-tag');
    await expect(tags).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(tags.nth(i)).toBeVisible();
    }
  });

  test('08 · Descrições visíveis sem hover (sempre acessíveis)', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // deixa .vis disparar
    const descs = page.locator('.svc-desc');
    await expect(descs).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(descs.nth(i)).toBeVisible();
    }
  });

  test('09 · CTA "Saiba mais" presente em todos os cards', async ({ page }) => {
    const arrows = page.locator('.svc-arrow');
    await expect(arrows).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      await expect(arrows.nth(i)).toContainText('Saiba mais');
    }
  });

  // ── HOVER ──────────────────────────────────────────────────────

  test('10 · Hover no card 1 — lift + sombra vermelha', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const card = page.locator('.svc-card').first();

    await card.hover();
    await page.waitForTimeout(350);
    await card.screenshot({ path: 'test_screenshots/10_hover_card1.png' });

    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow);
    expect(shadow, 'Sombra vermelha ausente no hover').toContain('226');
  });

  test('11 · Hover no ícone — scale + rotate visível no DOM', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const card = page.locator('.svc-card').nth(1);
    await card.hover();
    await page.waitForTimeout(400);

    const transform = await card.locator('.svc-icon').evaluate(el => getComputedStyle(el).transform);
    expect(transform, 'Ícone não está transformando no hover').not.toBe('none');
    await card.screenshot({ path: 'test_screenshots/11_hover_icon_card2.png' });
  });

  test('12 · Divider muda de cor no hover', async ({ page }) => {
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const card = page.locator('.svc-card').nth(2);
    await card.hover();
    await page.waitForTimeout(400);

    const bg = await card.locator('.svc-divider').evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg, 'Divider não ficou vermelho no hover').toContain('226');
  });

  // ── RESPONSIVO ─────────────────────────────────────────────────

  test('13 · Tablet (768px) — 2 colunas', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(PAGE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.locator('#servicos').scrollIntoViewIfNeeded();

    const cols = await page.locator('.svc-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const count = cols.trim().split(/\s+/).length;
    expect(count, `Tablet: esperava 2 colunas, recebeu ${count}`).toBe(2);
    await page.screenshot({ path: 'test_screenshots/13_tablet_768.png', fullPage: true });
  });

  test('14 · Mobile (375px) — 1 coluna', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PAGE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.locator('#servicos').scrollIntoViewIfNeeded();

    const cols = await page.locator('.svc-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const count = cols.trim().split(/\s+/).length;
    expect(count, `Mobile: esperava 1 coluna, recebeu ${count}`).toBe(1);
    await page.screenshot({ path: 'test_screenshots/14_mobile_375.png', fullPage: true });
  });

  test('15 · Desktop (1440px) — screenshot completa da seção', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    await page.locator('#servicos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.locator('.svc-grid').screenshot({ path: 'test_screenshots/15_desktop_grid_final.png' });
  });

});
