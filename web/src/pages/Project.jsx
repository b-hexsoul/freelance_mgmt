import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries"

export default function Project() {
  const { projectId } = useParams();
  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id: projectId }});
  
  if (loading) return <Spinner />;

  const { name, description, status, client } = data.project;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
          <h1>{name}</h1>
          <p>{description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{status}</p>

          <ClientInfo client={client} />
          <DeleteProjectButton projectId={projectId} />
        </div>
      )}
    </>
  )
}