import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Menu,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Button,
  FormHelperText,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { SelectChangeEvent } from "@mui/material/Select";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "../i18n";
import { useTranslation } from "react-i18next";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../ColorModeContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

type TopNavProps = {
  language: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  isRTL: boolean;
};

const TopNav = ({ language, onLanguageChange, isRTL }: TopNavProps) => {
  const { t } = useTranslation();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [frontendOpen, setFrontendOpen] = useState(false);
  const [backendOpen, setBackendOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesMenuAnchor, setServicesMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [expertisesMenuAnchor, setExpertisesMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [expertiseSelect, setExpertiseSelect] = useState("");
  const navigate = useNavigate();
  const isMenuOpen = Boolean(menuAnchor);

  const openMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as SupportedLanguage;
    if (value && value !== language) {
      onLanguageChange(value);
    }
  };

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const isDrawerOnLeft = !isRTL; // drawer side respects RTL (right for Arabic)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToTech = (slug: string) => {
    setDrawerOpen(false);
    navigate(`/tech/${slug}`);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.92)"
            : "rgba(18,26,43,0.92)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          flexDirection: isRTL ? "row-reverse" : "row",
          justifyContent: "space-between",
          gap: 2,
          py: 1,
          px: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {/* Show drawer trigger only on mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="Open menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              {isRTL ? <ChevronRightIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Box
            component="img"
            src="/rf-logo.png"
            alt="RhineFurat logo"
            sx={{
              height: 34,
              width: 34,
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            {t("nav.brand")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Desktop navbar menus */}
          <Button
            color="inherit"
            onClick={(e) => setServicesMenuAnchor(e.currentTarget)}
            sx={{ fontWeight: 600 }}
          >
            {t("nav.drawer.services")}
          </Button>
          <Menu
            anchorEl={servicesMenuAnchor}
            open={Boolean(servicesMenuAnchor)}
            onClose={() => setServicesMenuAnchor(null)}
            keepMounted
          >
            <MenuItem
              onClick={() => {
                setServicesMenuAnchor(null);
                navigate("/services/hire-developer");
              }}
            >
              {t("nav.drawer.servicesItems.hireDeveloper")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setServicesMenuAnchor(null);
                navigate("/services/nearshore");
              }}
            >
              {t("nav.drawer.servicesItems.nearshore")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setServicesMenuAnchor(null);
                navigate("/services/it-recruitment");
              }}
            >
              {t("nav.drawer.servicesItems.recruitment")}
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            onClick={(e) => setExpertisesMenuAnchor(e.currentTarget)}
            sx={{ fontWeight: 600 }}
          >
            {t("nav.drawer.expertises")}
          </Button>
          <Menu
            anchorEl={expertisesMenuAnchor}
            open={Boolean(expertisesMenuAnchor)}
            onClose={() => setExpertisesMenuAnchor(null)}
            keepMounted
            sx={{ p: 1 }}
          >
            <Typography sx={{ px: 2, py: 1, fontWeight: 700, opacity: 0.8 }}>
              {t("nav.drawer.expertiseItems.frontend")}
            </Typography>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("html");
              }}
            >
              HTML
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("css");
              }}
            >
              CSS
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("javascript");
              }}
            >
              JavaScript
            </MenuItem>
            <Divider />
            <Typography sx={{ px: 2, py: 1, fontWeight: 700, opacity: 0.8 }}>
              {t("nav.drawer.expertiseItems.backend")}
            </Typography>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("csharp");
              }}
            >
              C#
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("php");
              }}
            >
              PHP
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("cpp");
              }}
            >
              C++
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("python");
              }}
            >
              Python
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("java");
              }}
            >
              Java
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("nodejs");
              }}
            >
              NodeJS
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("mysql");
              }}
            >
              MySQL
            </MenuItem>
            <Divider />
            <Typography sx={{ px: 2, py: 1, fontWeight: 700, opacity: 0.8 }}>
              {t("nav.drawer.expertiseItems.mobile")}
            </Typography>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("flutter");
              }}
            >
              Flutter
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("react");
              }}
            >
              React
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("laravel");
              }}
            >
              Laravel
            </MenuItem>
            <MenuItem
              onClick={() => {
                setExpertisesMenuAnchor(null);
                goToTech("kotlin");
              }}
            >
              Kotlin
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            sx={{ fontWeight: 600 }}
            onClick={() => navigate('/#about')}
          >
            {t("nav.drawer.aboutUs")}
          </Button>

          {/* Language + theme toggles */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="language-select-label">
              {t("nav.languageToggle")}
            </InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              label={t("nav.languageToggle")}
              onChange={handleChange}
            >
              {SUPPORTED_LANGUAGES.map((code) => (
                <MenuItem key={code} value={code}>
                  {code === "en"
                    ? t("languages.labels.english")
                    : code === "ar"
                    ? t("languages.labels.arabic")
                    : t("languages.labels.dutch")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            aria-label={t("nav.darkModeToggle")}
            onClick={toggleColorMode}
            color="inherit"
            sx={{ ml: 1 }}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
        {/* Removed mobile overflow menu; language and theme controls are inline */}
      </Toolbar>
      {/* Mobile-only drawer (left) with language select */}
      <Drawer
        anchor={isDrawerOnLeft ? "left" : "right"}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 320 }} role="presentation">
          <Toolbar sx={{ justifyContent: isRTL ? "flex-start" : "flex-end" }}>
            <IconButton onClick={toggleDrawer(false)} aria-label="Close">
              {isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <Box sx={{ px: 2, pt: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="language-select-label-drawer">
                {t("nav.languageToggle")}
              </InputLabel>
              <Select
                labelId="language-select-label-drawer"
                id="language-select-drawer"
                value={language}
                label={t("nav.languageToggle")}
                onChange={handleChange}
              >
                {SUPPORTED_LANGUAGES.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code === "en"
                      ? t("languages.labels.english")
                      : code === "ar"
                      ? t("languages.labels.arabic")
                      : t("languages.labels.dutch")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <List sx={{ px: 1 }}>
            <ListItemButton onClick={() => setServicesOpen((v) => !v)}>
              <MiscellaneousServicesIcon
                sx={{ mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0 }}
              />
              <ListItemText
                primary={t("nav.drawer.services")}
                sx={{ textAlign: isRTL ? "right" : "left" }}
              />
              {servicesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/services/hire-developer");
                  }}
                >
                  <WorkOutlineIcon sx={{ mr: 1 }} />
                  <ListItemText
                    primary={t("nav.drawer.servicesItems.hireDeveloper")}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/services/nearshore");
                  }}
                >
                  <LayersOutlinedIcon sx={{ mr: 1 }} />
                  <ListItemText
                    primary={t("nav.drawer.servicesItems.nearshore")}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/services/it-recruitment");
                  }}
                >
                  <LayersOutlinedIcon sx={{ mr: 1 }} />
                  <ListItemText
                    primary={t("nav.drawer.servicesItems.recruitment")}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={() => setExpertiseOpen((v) => !v)}>
              <WorkOutlineIcon sx={{ mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0 }} />
              <ListItemText
                primary={t("nav.drawer.expertises")}
                sx={{ textAlign: isRTL ? "right" : "left" }}
              />
              {expertiseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expertiseOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Front-end subtree */}
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => setFrontendOpen((v) => !v)}
                >
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.frontend")}
                  />
                  {frontendOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={frontendOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("html")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.frontend.html")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("css")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.frontend.css")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("javascript")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.frontend.javascript")}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>

                {/* Back-end subtree */}
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => setBackendOpen((v) => !v)}
                >
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.backend")}
                  />
                  {backendOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={backendOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("csharp")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.csharp")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("php")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.php")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("cpp")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.cpp")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("python")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.python")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("java")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.java")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("nodejs")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.nodejs")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("mysql")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.backend.mysql")}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>

                {/* Mobile subtree */}
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.mobile")}
                  />
                  {mobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("flutter")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.mobile.flutter")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("react")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.mobile.react")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("laravel")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.mobile.laravel")}
                      />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 6 }}
                      onClick={() => goToTech("kotlin")}
                    >
                      <ListItemText
                        primary={t("nav.drawer.tech.mobile.kotlin")}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>

                {/* Other simple items */}
                <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.fullstack")}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.cloud")}
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                  <ListItemText
                    primary={t("nav.drawer.expertiseItems.frameworks")}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/#about');
              }}
            >
              <InfoOutlinedIcon sx={{ mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0 }} />
              <ListItemText
                primary={t("nav.drawer.aboutUs")}
                sx={{ textAlign: isRTL ? "right" : "left" }}
              />
            </ListItemButton>

            
          </List>
        </Box>
      </Drawer>
      {/* Right side dark/light toggle visible on all sizes */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 8, md: 16 },
          top: 8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label={t("nav.darkModeToggle")}
          onClick={toggleColorMode}
          color="inherit"
          sx={{ display: { md: "none" } }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default TopNav;
