"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (Object.values(formValues).includes("")) {
      alert("asdfasdf");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues)
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      router.push("/player/profile");
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-32 h-32"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
        />
      </svg>
      <div className="flex flex-col items-center gap-6">
        <form className="flex flex-col w-96" onSubmit={onSubmit}>
          <label className="mb-4" htmlFor="firstName"></label>
          <input
            placeholder="first name"
            className="input"
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
          <label className="mb-4" htmlFor="lastName"></label>
          <input
            placeholder="last name"
            className="input"
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
          <label className="mb-4" htmlFor="email"></label>
          <input
            placeholder="email"
            className="input"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <label className="mb-4" htmlFor="password"></label>
          <input
            placeholder="password"
            className="input"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <button className="m-4" disabled={loading}>
            {loading ? "loading..." : "register"}
          </button>
        </form>
        <Link className="link flex gap-2" href={"/signin"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>{" "}
          to signin
        </Link>
      </div>
    </div>
  );
}
