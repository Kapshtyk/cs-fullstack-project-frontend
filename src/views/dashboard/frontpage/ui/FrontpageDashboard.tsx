"use client";

import Image from "next/image";
import { useState } from "react";

import { CreateFrontpageForm } from "@/widgets/frontpage/create-frontpage-form";
import { EditFrontpageForm } from "@/widgets/frontpage/edit-frontpage-form";

import { useFrontpagesQuery } from "@/features/frontpage/get-frontpages";

import { GetFrontpageDto } from "@/entities/frontpage";

import { getAbsoluteUrl } from "@/shared/lib";
import { Button, Section } from "@/shared/ui";

export const FrontendDashboard = () => {
  const [selectedFrontpage, setSelectedFrontpage] = useState<GetFrontpageDto>();
  const { data: frontpages, isLoading } = useFrontpagesQuery({
    page: 1,
    perPage: 10,
  });

  const handleEditClick = (frontpage: GetFrontpageDto) => {
    setSelectedFrontpage(frontpage);
  };

  if (isLoading) {
    return <Section title="Loading...">Loading...</Section>;
  }

  return (
    <Section title="Frontpage" isHeading>
      <table className="responsive">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Is Published?</th>
            <th>Hero Image</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {frontpages?.items.map((frontpage) => (
            <tr key={frontpage.id}>
              <td data-label="Id">{frontpage.id}</td>
              <td data-label="Hero Banner Text">{frontpage.heroBannerText}</td>
              <td data-label="Is Published?">
                {frontpage.isPublished ? "Yes" : "No"}
              </td>
              <td data-label="Hero Image">
                <Image
                  src={getAbsoluteUrl(frontpage.heroBanner)}
                  alt={frontpage.heroBannerText}
                  width="100"
                  height="100"
                />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedFrontpage(frontpage);
                    handleEditClick(frontpage);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFrontpage && (
        <EditFrontpageForm
          frontpage={selectedFrontpage}
          closeModal={() => setSelectedFrontpage(undefined)}
          isModalOpen={!!selectedFrontpage}
        />
      )}
      <CreateFrontpageForm />
    </Section>
  );
};
