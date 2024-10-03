"use client";

import Image from "next/image";

import { EditUserForAdmin } from "@/features/user/edit-user-for-admin";
import { useUsersQuery } from "@/features/user/get-users";

import { getAbsoluteUrl } from "@/shared/lib";
import { Section } from "@/shared/ui";

const UsersDashboard = () => {
  const { data: users } = useUsersQuery({
    page: 1,
    perPage: 1000,
  });
  return (
    <Section title="Users" isHeading>
      {users && users.items.length === 0 && <div>No users found</div>}
      {users && (
        <table className="responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Avatar</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.items.map((user) => (
              <tr key={user.id}>
                <td data-label="Name">
                  {user.firstName} {user.lastName}
                </td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.role}</td>
                <td data-label="Avatar">
                  {user.avatar && (
                    <Image
                      src={getAbsoluteUrl(user.avatar)}
                      alt=""
                      sizes="10vw"
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                </td>
                <td data-label="Edit">
                  <EditUserForAdmin user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Section>
  );
};

export default UsersDashboard;
