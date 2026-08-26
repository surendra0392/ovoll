<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Define complete permissions grouped by domain
        $permissions = [
            // Pages
            'view_any_page',
            'view_page',
            'create_page',
            'update_page',
            'delete_page',
            'delete_any_page',

            // Services
            'view_any_service',
            'view_service',
            'create_service',
            'update_service',
            'delete_service',
            'view_any_service_category',
            'view_service_category',
            'create_service_category',
            'update_service_category',
            'delete_service_category',

            // Products
            'view_any_product',
            'view_product',
            'create_product',
            'update_product',
            'delete_product',

            // Articles & Insights
            'view_any_article',
            'view_article',
            'create_article',
            'update_article',
            'delete_article',
            'publish_article',
            'view_any_article_category',
            'create_article_category',
            'update_article_category',
            'delete_article_category',
            'view_any_article_series',
            'create_article_series',
            'update_article_series',
            'delete_article_series',
            'view_any_article_tag',
            'create_article_tag',
            'update_article_tag',
            'delete_article_tag',
            'view_any_author',
            'view_author',
            'create_author',
            'update_author',
            'delete_author',

            // Knowledge Hub
            'view_any_resource',
            'view_resource',
            'create_resource',
            'update_resource',
            'delete_resource',
            'publish_resource',
            'view_any_resource_category',
            'create_resource_category',
            'update_resource_category',
            'delete_resource_category',
            'view_any_resource_tag',
            'create_resource_tag',
            'update_resource_tag',
            'delete_resource_tag',

            // Studio Tools
            'view_any_tool',
            'view_tool',
            'create_tool',
            'update_tool',
            'delete_tool',
            'view_any_tool_category',
            'create_tool_category',
            'update_tool_category',
            'delete_tool_category',

            // FAQs & Offices
            'view_any_faq',
            'view_faq',
            'create_faq',
            'update_faq',
            'delete_faq',
            'view_any_office',
            'create_office',
            'update_office',
            'delete_office',

            // Leads & Inquiries
            'view_any_lead',
            'view_lead',
            'update_lead',
            'delete_lead',
            'export_lead',

            // Newsletter Subscribers
            'view_any_subscriber',
            'delete_subscriber',
            'export_subscriber',

            // Global Settings & Navigation
            'view_settings',
            'update_settings',
            'view_any_menu',
            'create_menu',
            'update_menu',
            'delete_menu',

            // Access Control (Roles & Permissions)
            'view_any_role',
            'view_role',
            'create_role',
            'update_role',
            'delete_role',
            'view_any_permission',
            'view_permission',
            'create_permission',
            'update_permission',
            'delete_permission',

            // System Telemetry & Health
            'view_health',
            'view_activity_logs',
            'clear_cache',
        ];

        // 2. Create all permissions
        foreach ($permissions as $permissionName) {
            Permission::findOrCreate($permissionName, 'web');
        }

        // 3. Create Roles and Assign Permissions
        // Super Admin (all permissions)
        $superAdminRole = Role::findOrCreate('super_admin', 'web');
        $superAdminRole->syncPermissions(Permission::all());

        // Administrator (all permissions)
        $adminRole = Role::findOrCreate('Administrator', 'web');
        $adminRole->syncPermissions(Permission::all());

        // Editor Role
        $editorRole = Role::findOrCreate('Editor', 'web');
        $editorRole->syncPermissions([
            // Pages
            'view_any_page', 'view_page', 'create_page', 'update_page', 'delete_page',
            // Services
            'view_any_service', 'view_service', 'create_service', 'update_service',
            'view_any_service_category', 'view_service_category', 'create_service_category', 'update_service_category',
            // Products
            'view_any_product', 'view_product', 'create_product', 'update_product',
            // Articles
            'view_any_article', 'view_article', 'create_article', 'update_article', 'delete_article', 'publish_article',
            'view_any_article_category', 'create_article_category', 'update_article_category',
            'view_any_article_series', 'create_article_series', 'update_article_series',
            'view_any_article_tag', 'create_article_tag', 'update_article_tag',
            'view_any_author', 'view_author', 'create_author', 'update_author',
            // Knowledge Hub
            'view_any_resource', 'view_resource', 'create_resource', 'update_resource', 'delete_resource', 'publish_resource',
            'view_any_resource_category', 'create_resource_category', 'update_resource_category',
            'view_any_resource_tag', 'create_resource_tag', 'update_resource_tag',
            // Studio Tools
            'view_any_tool', 'view_tool', 'create_tool', 'update_tool',
            'view_any_tool_category', 'create_tool_category', 'update_tool_category',
            // FAQs
            'view_any_faq', 'view_faq', 'create_faq', 'update_faq', 'delete_faq',
            // Leads & Subscribers (Read-only)
            'view_any_lead', 'view_lead',
            'view_any_subscriber',
            // Settings & Menus (View)
            'view_settings', 'view_any_menu',
        ]);

        // Content Writer Role
        $writerRole = Role::findOrCreate('Content Writer', 'web');
        $writerRole->syncPermissions([
            // Articles
            'view_any_article', 'view_article', 'create_article', 'update_article',
            'view_any_article_category', 'view_any_article_series', 'view_any_article_tag',
            'view_any_author', 'view_author',
            // Knowledge Hub
            'view_any_resource', 'view_resource', 'create_resource', 'update_resource',
            'view_any_resource_category', 'view_any_resource_tag',
            // FAQs
            'view_any_faq', 'view_faq', 'create_faq', 'update_faq',
            // Read access to content references
            'view_any_page', 'view_any_service', 'view_any_product', 'view_any_tool',
        ]);

        // Marketing Role
        $marketingRole = Role::findOrCreate('Marketing', 'web');
        $marketingRole->syncPermissions([
            // Leads & Inquiries
            'view_any_lead', 'view_lead', 'export_lead',
            // Newsletter Subscribers
            'view_any_subscriber', 'export_subscriber',
            // Articles & Resources
            'view_any_article', 'view_article', 'create_article', 'update_article', 'publish_article',
            'view_any_resource', 'view_resource', 'create_resource', 'update_resource', 'publish_resource',
            // FAQs
            'view_any_faq', 'view_faq', 'create_faq', 'update_faq',
            // Read-only access to products & services
            'view_any_service', 'view_any_product', 'view_any_tool', 'view_any_page',
        ]);

        // Support Role
        $supportRole = Role::findOrCreate('Support', 'web');
        $supportRole->syncPermissions([
            // Leads
            'view_any_lead', 'view_lead', 'update_lead',
            // Newsletter
            'view_any_subscriber',
            // Reference reading
            'view_any_page', 'view_page',
            'view_any_service', 'view_service',
            'view_any_product', 'view_product',
            'view_any_article', 'view_article',
            'view_any_resource', 'view_resource',
            'view_any_faq', 'view_faq',
        ]);
    }
}
