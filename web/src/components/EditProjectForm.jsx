import { useMutation } from "@apollo/client";
import { useState } from "react"
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    // update(cache, { data: { updateProject } }) {
    //   const projects = cache.readQuery({ query: GET_PROJECTS });
    //   console.log(projects);
    //   const projectIdx = projects.findIndex(project => project.id === updateProject.id);
    //   projects[projectIdx] = updateProject;
    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: { projects }
    //   })
    // }
  })

  function onSubmit(e) {
    e.preventDefault();

    if (!name || !description || !status) {
      return;
    }

    updateProject();
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}