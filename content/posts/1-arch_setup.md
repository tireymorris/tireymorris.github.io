# Arch Install Guide

I've been doing a lot of cross-platform development lately using Docker, and access to a high-quality Linux machine has been a saving grace for hunting down platform-specific bugs in the codebase. I thought I'd share my installation process for anyone interested in going down the Arch Linux rabbit hole who doesn't want to spend a few days agonizing over the specifics like I did.

### Ensure EFI directory exists

`ls /sys/firmware/efi/efivars`

(if no output, system is probably in BIOS mode)

### Pre-installation housekeeping

`timedatectl set-ntp true` (turn on datetime sync via Network Time Protocol)

### Create, format, and mount partitions

1. First, use `lsblk` to see which block devices are available for installation.
2. Then, run `cgdisk /dev/$DEVICE` to start up the cgdisk interface.
   - Select `New` and create boot sector of size `512M` with code `ef00`, name it `boot`
   - create swap of size `4G` with code `8200`, name it `swap`
   - use the rest of the space with code `8300` and name it `root`
   - select `Write` then `Quit`
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

`pacstrap /mnt base base-devel linux linux-firmware linux-headers zsh dialog netctl vim openssh git sudo wget wpa_supplicant dhcpcd`

### System configuration (mostly lifted from arch wiki)

1. Generate an `fstab` file, which describes how to mount various filesystems on the system
   - `genfstab -U /mnt >> /mnt/etc/fstab`
2. Change-root into the new system `arch-chroot /mnt`
3. Set the timezone, then run hwclock to generate `/etc/adjtime`, which contains descriptive information about the hardware mode clock setting and clock drift factor.
   - `ln -sf /usr/share/zoneinfo/Region/City /etc/localtime`
     - e.g. `ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime`
   - `hwclock --systohc`
4. Generate the system locale
   - Uncomment needed locales from `/etc/locale.gen`, then run `locale-gen`
5. Set hostname: `hostnamectl set-hostname myhostname`
6. Set the root password: `passwd`

### Bootloader

(I'm choosing rEFInd here, as it's simple to configure and maintain)

1. `pacman -S refind && refind-install`
2. Update rEFInd config file (`/boot/refind_linux.conf`)
   - delete the first two entries
   - reformat the third entry to resemble `"Boot using default options" "root=PARTUUID=$ROOT_UUID rw quiet splash"`
     - note: the root UUID should already be present in this line

### Wrapping up

Fin! You can exit chroot and reboot now. Enjoy the installation!
