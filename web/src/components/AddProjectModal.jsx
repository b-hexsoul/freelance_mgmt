import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [clientId, setClientId] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [ ...projects, addProject ]}
      })
    }
  })

  const { data, error, loading } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />

  function onSubmit (e) {
    e.preventDefault()
    if (name === '' || description === '' || !status || !clientId) {
      return alert('Please fill in all fields');
    }
    
    addProject();

    setName('');
    setDescription('');
    setStatus('');
    setClientId('');
  }

  return (
    <>
      <button type="button" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <FaList className="icon" />
        <span>New Project</span>
      </button>

      <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addProjectModalTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalTitle">Add New Project</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select type="text" className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    <option value='new'>New</option>
                    <option value='progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select type="text" className="form-select" id="client" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                    <option value="">Select Client</option>
                    {data?.clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}