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
      <div className="flex flex-col justify-center items-center form-control gap-6">
        <form className="form-control" onSubmit={onSubmit}>
          <label className="input-group mb-4 w-fit">
            <span>First Name: </span>
            <input
              className="input"
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="input-group mb-4 w-fit">
            <span>Last Name: </span>
            <input
              className="input"
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </label>
          <label className="input-group mb-4 w-fit">
            <span>Email: </span>
            <input
              className="input"
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label className="input-group mb-4 w-fit">
            <span>Password: </span>
            <input
              className="input"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "loading..." : "Register"}
          </button>
        </form>
        <Link className="link" href={"/signin"}>
          🤝 To Signin
        </Link>
      </div>
    </div>
  );
}
