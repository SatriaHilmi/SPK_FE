import { useForm } from "react-hook-form";
import { Criteria, useGetCriteriaQuery } from "../hooks/criteria/useGetCriteriaQuery";
import { useUpdateCriteriaMutation } from "../hooks/criteria/useUpdateCriteriaMutation";
import React from "react";
import { MdSaveAlt } from "react-icons/md";
import { BiReset } from "react-icons/bi";

interface FormEditKriteriaProps {
  onClickClose: () => void,
  data: Criteria
}

export const FormEditKriteria: React.FC<FormEditKriteriaProps> = ({ onClickClose, data }) => {

  const { mutateAsync } = useUpdateCriteriaMutation()
  const { refetch } = useGetCriteriaQuery()
  const { register, formState: { errors }, handleSubmit } = useForm<Criteria>({ values: data });


  const submit = async (data: Criteria) => {
    try {
      const normalize = { ...data, weight: Number(data.weight) }
      await mutateAsync(normalize)
      refetch()
      onClickClose()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Kode Kriteria */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">Kode Kriteria</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Kode" {...register('code', {
            required: 'Kode tidak boleh kosong!',
            minLength: { value: 1, message: 'Kode minimal 3 karakter!' },
            maxLength: { value: 2, message: 'Kode maksimal 2 karakter!' }
          })} />
          {errors.code && <span className="text-red-500">{errors.code.message}</span>}
        </div>

        {/* Nama Kriteria */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">Nama Kriteria</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Status" {...register('name', { required: 'Nama tidak boleh kosong!' })} />
          {/* {errors.name && <span className="text-red-500">{errors.name.message}</span>} */}
        </div>

        {/* Bobot Kriteria */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">Bobot Kriteria</label>
          <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan bobot kriteria" {...register('weight', { required: 'Bobot tidak boleh kosong!' })} />
          {/* {errors.weight && <span className="text-red-500">Bobot tidak boleh kosong!</span>} */}
        </div>

        {/* Jenis Kriteria */}
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">Jenis Kriteria</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" {...register('criteria', { required: 'Jenis tidak boleh kosong!' })} >
            <option value="">--Pilih Jenis Kriteria--</option>
            <option value="BENEFIT" >Benefit</option>
            <option value="COST">Cost</option>
          </select>
        </div>
      </div>

      {/* Tombol Simpan & Reset */}
      <div className="flex justify-end space-x-4">
        <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center">
          <MdSaveAlt className="mr-1" /> <span>Simpan</span>
        </button>
        <button type="reset" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center">
          <BiReset className="mr-1" /> <span>Reset</span>
        </button>
      </div>
    </form>
  )
}