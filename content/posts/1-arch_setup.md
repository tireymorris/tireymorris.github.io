# Arch Install Guide

I've been doing a lot of cross-platform development lately using Docker, and access to a high-quality Linux machine has been a saving grace for hunting down platform-specific bugs in the codebase. I thought I'd share my installation process for anyone interested in going down the Arch Linux rabbit hole who doesn't want to spend a few days agonizing over the specifics like I did.

### Ensure EFI directory exists

`ls /sys/firmware/efi/efivars`

(if no output, system is probably in BIOS mode)

### Create, format, and mount partitions

1. First, use `lsblk` to see which block devices are available for installation.
2. Then, run `cgdisk /dev/$DEVICE` to start up the cgdisk interface.
   - Select `New` and create boot sector of size `512M` with code `ef00`, name it `boot`
   - Create swap of size `4G` with code `8200`, name it `swap`
   - Use the rest of the space with code `8300` and name it `root`
   - Select `Write` then `Quit`
3. `lsblk` again to confirm the changes were made
4. Format the partitions - `ext4` for root and `FAT32` for boot
   - `mkfs.fat -F 32 /dev/$BOOT`
   - `mkfs.ext4 /dev/$ROOT`
   - `mkswap /dev/$SWAP`
   - `swapon /dev/$SWAP`
5. Mount the filesystems
   - `mount /dev/$ROOT /mnt`
   - `mkdir /mnt/boot && mount /dev/$BOOT /mnt/boot`

### Install and configure the basic system

`pacstrap /mnt base base-devel linux linux-firmware linux-headers zsh dialog vim openssh git sudo wget iwd dhcpcd python`

### System configuration (mostly lifted from arch wiki)

1. Generate an `fstab` file, which describes how to mount various filesystems on the system
   - `genfstab -U /mnt >> /mnt/etc/fstab`
2. Change-root into the new system:
   - `arch-chroot /mnt`
3. Set the timezone, then run hwclock to generate `/etc/adjtime`, which contains descriptive information about the hardware mode clock setting and clock drift factor.
   - `ln -sf /usr/share/zoneinfo/Region/City /etc/localtime`
     - e.g. `ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime`
4. Set the current time to the hardware clock
   - `hwclock --systohc`
5. Synchronize time with datetime servers
   - `timedatectl set-ntp true`
6. Generate the system locale
   - Uncomment needed locales from `/etc/locale.gen`, then run `locale-gen`
7. Set the root password:
   - `passwd`
8. Optionally, add a user:
   - `useradd --create-home <username>`
   - `usermod -aG wheel <username>`
   - `EDITOR=vim visudo`
     - uncomment one of the lines containing the phrase `%wheel ALL=(ALL)`
     - this allows members of group wheel to use sudo, with/without password

### Bootloader

(I'm choosing systemd-boot here, as it's simple to configure and maintain)

1. Run `bootctl --path=/boot install`
2. Create the file `/boot/loader/entries/arch.conf` with following contents:

```
title arch
linux /vmlinuz-linux
initrd /initramfs-linux.img
options root=UUID=$UUID
```

- Note: The root UUID can be found by running `lsblk -no UUID /dev/$ROOT`

### Post-installation

Some cleanup tasks I like to do after the system reboots:

- `sudo systemctl enable sshd && sudo systemctl start sshd`
- `sudo systemctl enable dhcpcd && sudo systemctl start sshd`

### Wrapping up

Fin! You can exit chroot and reboot now. Enjoy the installation!
