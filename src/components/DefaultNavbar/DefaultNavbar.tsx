import React, { useState } from 'react';
import { Center, Navbar, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import {
  AddressBook,
  Award,
  Box,
  Building,
  BuildingWarehouse,
  Car,
  CurrencyDollar,
  FileBarcode,
  Fingerprint,
  Home,
  Icon,
  Message,
  Users
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import useAppStore from 'stores/use-app-store';
import useDefaultNavbarStyles from 'components/DefaultNavbar/DefaultNavbar.styles';
import useAdminAuthStore from 'stores/use-admin-auth-store';

interface NavbarLink {
  link: string;
  label: string;
  icon: Icon;
  childLinks?: NavbarChildLink[];
  disableForEmployee?: boolean;
}

interface NavbarChildLink {
  link: string;
  label: string;
}

const navbarLinks: NavbarLink[] = [
  {
    link: '/admin',
    label: 'Trang chủ',
    icon: Home,
  },
  {
    link: '/admin/address',
    label: 'Địa chỉ',
    icon: AddressBook,
    childLinks: [
      {
        link: '/admin/address/province',
        label: 'Tỉnh thành',
      },
      {
        link: '/admin/address/district',
        label: 'Quận huyện',
      },
      {
        link: '/admin/address/ward',
        label: 'Phường xã',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/user',
    label: 'Người dùng',
    icon: Fingerprint,
    childLinks: [
      {
        link: '/admin/user/role',
        label: 'Quyền',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/product',
    label: 'Sản phẩm',
    icon: Box,
    childLinks: [
      {
        link: '/admin/category',
        label: 'Danh mục sản phẩm',
      },
      {
        link: '/admin/product/brand',
        label: 'Nhãn hiệu',
      },
      {
        link: '/admin/product/unit',
        label: 'Đơn vị tính',
      },
      {
        link: '/admin/product/tag',
        label: 'Tag',
      },

      {
        link: '/admin/product/property',
        label: 'Thuộc tính sản phẩm',
      },
      {
        link: '/admin/product/specification',
        label: 'Thông số sản phẩm',
      },
    ],
    disableForEmployee: true,
  },
  {
    link: '/admin/order',
    label: 'Đơn hàng',
    icon: FileBarcode,
    childLinks: [],
  },
  {
    link: '/admin/review',
    label: 'Đánh giá',
    icon: Message,
    childLinks: [],
  },

];

export function DefaultNavbar() {
  const theme = useMantineTheme();
  const { opened } = useAppStore();
  const { classes, cx } = useDefaultNavbarStyles();
  const [active, setActive] = useState('Trang chủ');

  const { isOnlyEmployee } = useAdminAuthStore();

  const navbarLinksFragment = navbarLinks.map(navbarLink => (
    <Stack
      key={navbarLink.label}
      spacing={0}
      sx={{ borderRadius: theme.radius.sm, overflow: 'hidden' }}
    >
      <Link
        to={navbarLink.link}
        className={cx(classes.link, {
          [classes.linkActive]: navbarLink.label === active,
          [classes.linkDisabled]: isOnlyEmployee() && navbarLink.disableForEmployee,
        })}
        onClick={() => setActive(navbarLink.label)}
      >
        <navbarLink.icon className={classes.linkIcon}/>
        <span>{navbarLink.label}</span>
      </Link>
      {navbarLink.label === active && (navbarLink.childLinks || []).map(childLink => (
        <Link
          key={childLink.label}
          to={childLink.link}
          className={cx(classes.link, { [classes.childLinkActive]: navbarLink.label === active })}
        >
          <Center sx={{ width: 24, marginRight: theme.spacing.sm }}>
            <div className={classes.childLinkDot}/>
          </Center>
          <span>{childLink.label}</span>
        </Link>
      ))}
    </Stack>
  ));

  return (
    <Navbar
      p="md"
      width={{ md: 250 }}
      hidden={!opened}
    >
      <Navbar.Section grow component={ScrollArea}>
        {navbarLinksFragment}
      </Navbar.Section>
    </Navbar>
  );
}
