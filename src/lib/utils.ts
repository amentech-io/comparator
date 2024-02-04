import { differenceInYears } from "date-fns"

export type req = {
  duration: string
  birthday: string
}

export async function getData(req: req) {
  'use server'
  const amanaRes = await amana(req)
  const lalgeriennevieRes = await lalgeriennevie(req)

  return {
    amana: amanaRes?.value,
    lalgeriennevie: lalgeriennevieRes?.value,
  }
}

export async function amana(req: req) {
  const options = {
    method: 'GET',
  }

  const age = differenceInYears(new Date(), new Date(req.birthday))

  try {
  const rez = await fetch(`https://digit.amana.dz/amana_tarification.simulationvoyage/simulation-voyage/coupon-code/null/type-contrat-id/510/produitId/1/destination-id/82/duree-jours/${req.duration}/convention-id/1/age/${age}/nbrs-personne-individuel/1/nbrs-personne-tranche1/0/nbrs-personne-tranche2/0/nbrs-personne-tranche3/0/nbrs-personne-tranche4/0?ticket=false`, options)

    const json = await rez.json()

    return  {
      from: 'amana',
      value: json.list_formule?.[0]?.montantPrime
    }
  } catch(e) {
    console.error('amana error | ', e)
  }
}

export async function lalgeriennevie(req: req) {
  const options = {
    method: 'GET',
  }

  try {
    const rez = await fetch(`https://lalgeriennevie.dz/wp-content/uploads/forms/vdevis.php?tsous=2&nom=nom&pnom=prenom&rss=&mail=email%40example.com&tel=0777777777&adr=adresse&ddn=${req.birthday}&dst=A&pport=passeport&ddef=2024-01-31&dure=${req.duration}&getTotal=1`, options)

    const json = await rez.json()
    return  {
      from: 'lalgeriennevie',
      value: json.total
    }
  } catch(e) {
    console.error('lalgeriennevie error | ', e)
  }
}
