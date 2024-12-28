"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  LogIn,
  LogOut,
  Box,
  HelpCircle, //help icon
  Clock, // time icon
  Copy, // copy icon
  Check, // check icon
  FileText,
  Plus,
  Minus,
  CheckCircle2,
  XCircle,
  Leaf,
  Flame,
  ChevronDown,
  Wallet,
  Eye,
  Search,
  ExternalLink, // external links
  TriangleAlert,
  Ellipsis,
  Hexagon,
  Ticket,
  Package,
  LineChart,
  Users,
  User,
  Settings,
  CircleDashed,
  ShieldPlus,
  Info,
  X,
  Menu,
} from "lucide-react";

type Icons =
  | "menu"
  | "X"
  | "home"
  | "info"
  | "user"
  | "users"
  | "login"
  | "logout"
  | "box"
  | "help"
  | "time"
  | "copy"
  | "check"
  | "fileText"
  | "add"
  | "remove"
  | "circleCheck"
  | "circleClose"
  | "leaf"
  | "flame"
  | "down"
  | "wallet"
  | "eye"
  | "search"
  | "link"
  | "warning"
  | "ellipsis"
  | "hexagon"
  | "ticket"
  | "package"
  | "linechart"
  | "settings"
  | "circleDashed"
  | "shieldPlus";

interface IconProps {
  icon: Icons;
  className?: string;
}

const IconController: React.FC<IconProps> = ({ icon, className }) => {
  const _classname = cn("w-4 h-4", className);

  const getIcon = (icon: Icons) => {
    switch (icon) {
      case "home":
        return <Home className={_classname} />;
      case "user":
        return <User className={_classname} />;
      case "users":
        return <Users className={_classname} />;
      case "login":
        return <LogIn className={_classname} />;
      case "logout":
        return <LogOut className={_classname} />;
      case "box":
        return <Box className={_classname} />;
      case "help":
        return <HelpCircle className={_classname} />;
      case "time":
        return <Clock className={_classname} />;
      case "copy":
        return <Copy className={_classname} />;
      case "check":
        return <Check className={`${_classname} text-green-500`} />;
      case "fileText":
        return <FileText className={_classname} />;
      case "add":
        return <Plus className={_classname} />;
      case "remove":
        return <Minus className={_classname} />;
      case "circleCheck":
        return <CheckCircle2 className={`${_classname} text-green-500`} />;
      case "circleClose":
        return <XCircle className={`${_classname} text-red-500`} />;
      case "leaf":
        return <Leaf className={`${_classname} text-green-500`} />;
      case "flame":
        return <Flame className={`${_classname} text-red-500`} />;
      case "down":
        return <ChevronDown className={_classname} />;
      case "wallet":
        return <Wallet className={_classname} />;
      case "eye":
        return <Eye className={_classname} />;
      case "search":
        return <Search className={_classname} />;
      case "link":
        return <ExternalLink className={`${_classname} text-blue-500`} />;
      case "warning":
        return <TriangleAlert className={`${_classname} text-red-500`} />;
      case "ellipsis":
        return <Ellipsis className={_classname} />;
      case "hexagon":
        return <Hexagon className={_classname} />;
      case "ticket":
        return <Ticket className={_classname} />;
      case "package":
        return <Package className={_classname} />;
      case "linechart":
        return <LineChart className={_classname} />;
      case "settings":
        return <Settings className={_classname} />;
      case "circleDashed":
        return <CircleDashed className={_classname} />;
      case "shieldPlus":
        return <ShieldPlus className={_classname} />;
      case "info":
        return <Info className={_classname} />;
      case "X":
        return <X className={_classname} />;
      case "menu":
        return <Menu className={_classname} />;
      default:
        return null;
    }
  };

  return <>{getIcon(icon)}</>;
};

export default IconController;
