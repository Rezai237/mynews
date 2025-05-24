import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("components/layout/Layout.tsx", [
    index("routes/home.tsx"),
    route("article/:slug", "routes/article.tsx"),
    route("category/:slug", "routes/category.tsx"),
    route("tag/:slug", "routes/tag.tsx"),
    route("web3", "routes/web3.tsx"),
    route("search", "routes/search.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("auth/signin", "routes/auth/signin.tsx"),
    route("auth/signup", "routes/auth/signup.tsx"),
    route("profile", "routes/profile.tsx"),
    route("settings", "routes/settings.tsx"),
    route("bookmarks", "routes/bookmarks.tsx"),
    route("admin", "routes/admin.tsx"),
    route("admin/articles/new", "routes/admin/articles/new.tsx"),
    route("admin/articles/:id/edit", "routes/admin/articles/edit.tsx"),
  ])
] satisfies RouteConfig;
