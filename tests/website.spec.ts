import { test, expect } from '@playwright/test';

test.describe('dandbweb Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://dandbweb.vercel.app/');
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('D&B Web - Профессиональная веб-разработка в Астане | Создание сайтов');
  });

  test('should have all headings', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Профессиональная веб-разработка' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Наши услуги' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Landing Page' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Сайт-визитка' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Корпоративный сайт' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Интернет-магазин' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Сайт на выбор' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Отзывы клиентов' })).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'О нас' })).toBeVisible();
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Проекты' })).toBeVisible();
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Блог' })).toBeVisible();
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Контакты' })).toBeVisible();
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Заказать сайт' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Как выбрать нужный сайт →' })).toBeVisible();
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
  });

  test('should have all buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Получить консультацию' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Получить консультацию' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Получить консультацию' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Получить консультацию' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Получить консультацию' })).toBeVisible();
  });

  test('should have all images', async ({ page }) => {
    await expect(page.locator('img[alt="Logo"]')).toBeVisible();
    await expect(page.locator('img[alt="Александр Петров"]')).toBeVisible();
    await expect(page.locator('img[alt="Елена Смирнова"]')).toBeVisible();
    await expect(page.locator('img[alt="Дмитрий Иванов"]')).toBeVisible();
  });

  test('should have all forms', async ({ page }) => {
    
  });

  test('should have all inputs', async ({ page }) => {
    
  });
});