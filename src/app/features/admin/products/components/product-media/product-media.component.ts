import { Component, HostListener, Input, OnChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface ProductMediaItem {
  url: string;
  alt?: string;
}

@Component({
  selector: 'app-product-media',
  imports: [MatIcon],
  templateUrl: './product-media.component.html',
  styleUrl: './product-media.component.scss',
})
export class ProductMediaComponent implements OnChanges {
  @Input() images: ProductMediaItem[] = [];
  @Input() title = 'Product image';

  selectedIndex = 0;
  lightboxOpen = false;

  private readonly fallbackImages: ProductMediaItem[] = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwbPm_gJXVL5G9L0TrDggprQfNS_9V4iU63QLk_-nCF22_svGkccvqEPzgAnwDL0VBnlAl8MgQCO__FsYCb2pxfx6JneW3bTGbRKAQXabz2UfoeoMknl06LwGUUbYcOlaZ1qqJakG7zVp2LsItUDL9uB4bPWZ05SXHELcAiziilKiRIRsmcj9xFophOkp9Nr9JVFW6wEsLxXZ2k391y5fz7X_jMtxciuVqMQCMPFVjPnJ3HDKKDljTRj-DORKIJCW6_TmCZEO-RIE',
      alt: 'Main product image',
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFB8PKVvlD9DX1WsY6aHa_OIA2F-ZjGAYsoD5r-WVV-u9olRFY-Uwvbb8cuH5FlqBU1_GDdJxDs3gH6C9VxP0acwd9dM5n3S9G7dpio36sNgkdhSpxoTF4_YArL8fkBtjCKdgKx0ytQsVSAUU2_s5piKlOt38zlOd7p_AHLWPFoQWtqQIPj79_u268xBJjDr55je7ZAgrQ1eHZfxM2mj7QjO268j_J7Sd_vWR4R2rS-M4QuzyVK6Zffd6P4fqoixVqR6XKnRSMnGw',
      alt: 'Product gallery image 1',
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy-vcLHDiz1Yo-aIiRjZui6GqQpA1y62j-XdWizQYeaKcWhaNWiKTUoVuJar09Ypd48NKr9dMW7IUovkyqh6N_25BxD8vBReZ4Wy_gjtfqeWBMwhIF6h1QB_P7MThjHoZOtz3qrmmXmvpKaV31lOqb53PT9EW5iiWbrKQtEKIVbqNYPCadVkE0dt_NXHPukRVCemdNZqkMYZg7QRcFRnUvvXpfrZipS7bQ3ZtkwFXTqPPLSGHZRg4mwtBI2edpouP0XNvM3dD9JoY',
      alt: 'Product gallery image 2',
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV8Rhvp8G9iR1kmbwuxyVioslwZdJtritWrjSwekvjfz54VpR4ie0gLtlU9iZu-JwyXQYIQ4tvMPfiCP2ZxsJ0eWy7g56LIJouJTe_ub5ZWNSYWKmt4BB53D--E0V_tu0saOuWZ_ER7yyjx5ilfORQIF8_gT6B9J_I_SXbmbk_NjQOOHvTR-IBjS38CUmSVBL05UOY1Hes-UuZfX9W-S_Di5lBrInH2P2z2i3bo33kWja3Ug583D2NsXRKo34Zg7d8hITJ2Sj3Uu0',
      alt: 'Product gallery image 3',
    },
  ];

  get galleryImages(): ProductMediaItem[] {
    return this.images.length ? this.images : this.fallbackImages;
  }

  get selectedImage(): ProductMediaItem {
    return this.galleryImages[this.selectedIndex] ?? this.galleryImages[0];
  }

  ngOnChanges(): void {
    this.selectedIndex = 0;
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  prev(): void {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  next(): void {
    this.selectedIndex = (this.selectedIndex + 1) % this.galleryImages.length;
  }

  get hasPrev(): boolean {
    return this.selectedIndex > 0;
  }

  get hasNext(): boolean {
    return this.selectedIndex < this.galleryImages.length - 1;
  }

  openLightbox(): void {
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }
}
