// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductMedia } from "../../components/commerce/ProductMedia";
import { HEAL_VARIANTS } from "../../lib/brand/air-variants";
import {
  HEAL_CATALOGUE_MEDIA,
  type HealCatalogueId,
} from "../../lib/brand/catalogue-media";
import { FIXTURE_PRODUCTS } from "../../lib/commerce/fixture-data";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    fill,
    priority,
    ...props
  }: ComponentProps<"img"> & {
    fill?: boolean;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={src}
      data-fill={fill}
      data-priority={priority}
      {...props}
    />
  ),
}));

afterEach(cleanup);

describe("mídia unificada do catálogo HEAL", () => {
  it("usa os mesmos assets em marca, catálogo e página do produto", () => {
    for (const variant of HEAL_VARIANTS) {
      const media = HEAL_CATALOGUE_MEDIA[variant.id];
      const product = FIXTURE_PRODUCTS.find(
        (item) => item.handle === variant.id,
      );

      expect(variant.image).toBe(media.url);
      expect(product?.featuredImage).toMatchObject(media);
      expect(product?.images).toHaveLength(1);
      expect(product?.images[0]).toEqual(product?.featuredImage);
    }
  });

  it("identifica cada aroma e a categoria sem depender do texto da imagem", () => {
    for (const product of FIXTURE_PRODUCTS) {
      const media = HEAL_CATALOGUE_MEDIA[product.handle as HealCatalogueId];
      const variant = HEAL_VARIANTS.find((item) => item.id === product.handle);

      expect(media.alt).toContain("incenso HEAL");
      expect(media.alt).toContain(variant?.name);
      expect(media.alt).toContain("Imagem ilustrativa");
      expect(media.url).toBe(
        `/images/heals/catalogue-v2/${product.handle}.webp`,
      );
    }
  });

  it("mantém a imagem inteira em uma área própria e uma legenda fora dela", () => {
    const product = FIXTURE_PRODUCTS[0];
    render(<ProductMedia product={product} />);

    const image = screen.getByRole("img", { name: product.featuredImage!.alt });
    const caption = screen.getByText("Incenso em bastão · imagem ilustrativa");
    const frame = image.parentElement;

    expect(image).toHaveAttribute("src", product.featuredImage!.url);
    expect(image).toHaveAttribute("data-fill", "true");
    expect(image).toHaveStyle({ objectFit: "contain" });
    expect(frame?.parentElement?.tagName).toBe("FIGURE");
    expect(caption.tagName).toBe("FIGCAPTION");
    expect(frame).not.toContainElement(caption);
    expect(
      screen.queryByText(/Design da coleção|embalagem em finalização/),
    ).not.toBeInTheDocument();
  });

  it("usa tamanho de download adequado ao contexto de card ou destaque", () => {
    const { rerender } = render(<ProductMedia product={FIXTURE_PRODUCTS[0]} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "sizes",
      "(max-width: 650px) 50vw, (max-width: 1023px) 33vw, 25vw",
    );

    rerender(<ProductMedia product={FIXTURE_PRODUCTS[0]} priority />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "sizes",
      "(max-width: 1023px) 100vw, 60vw",
    );
    expect(screen.getByRole("img")).toHaveAttribute("data-priority", "true");
  });

  it("não adiciona área vazia quando o produto não possui imagem", () => {
    const { container } = render(
      <ProductMedia
        product={{ ...FIXTURE_PRODUCTS[0], featuredImage: null }}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
